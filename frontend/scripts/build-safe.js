#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('[INFO] Starting safe build process...');

// Set a fallback DATABASE_URL if not present
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/fallback';
  console.log('[WARN] No DATABASE_URL found, using fallback for build');
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      stdio: 'inherit',
      env: process.env
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function build() {
  let prismaGenerated = false;
  
  // Try to generate Prisma client
  try {
    console.log('[INFO] Generating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);
    console.log('[SUCCESS] Prisma client generated successfully');
    prismaGenerated = true;
  } catch (error) {
    console.warn('[WARN] Prisma generation failed:', error.message);
    console.log('[INFO] Attempting to continue without Prisma generation...');
  }
  
  // Always try to build Next.js
  try {
    console.log('[INFO] Building Next.js application...');
    await runCommand('npx', ['next', 'build']);
    console.log('[SUCCESS] Build completed successfully');
    
    if (!prismaGenerated) {
      console.log('[WARN] Note: Build completed without Prisma client generation');
      console.log('        Database features may not work correctly in production');
    }
    
  } catch (buildError) {
    console.error('[ERROR] Next.js build failed:', buildError.message);
    
    if (prismaGenerated) {
      console.log('[INFO] Trying to rebuild without Prisma...');
      // Clean any generated Prisma files and try again
      try {
        await runCommand('rm', ['-rf', 'node_modules/.prisma']);
        await runCommand('npx', ['next', 'build']);
        console.log('[SUCCESS] Build completed after cleaning Prisma files');
      } catch (finalError) {
        console.error('[ERROR] Final build attempt failed:', finalError.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
}

build(); 