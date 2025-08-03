#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('[INFO] Starting safe build process...');

// Set a fallback DATABASE_URL if not present
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/fallback';
  console.log('[WARN] No DATABASE_URL found, using fallback for build');
}

// Ensure NODE_ENV is set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
  console.log('[INFO] Set NODE_ENV to production');
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
  
  // Dependencies are already installed by the platform
  console.log('[INFO] Using pre-installed dependencies');
  
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
    
    // Try different recovery strategies
    console.log('[INFO] Attempting build recovery...');
    
    try {
      // Strategy 1: Clean Prisma and try again
      if (prismaGenerated) {
        console.log('[INFO] Cleaning Prisma files...');
        await runCommand('rm', ['-rf', 'node_modules/.prisma']);
      }
      
      // Strategy 2: Clean Next.js cache
      console.log('[INFO] Cleaning Next.js cache...');
      await runCommand('rm', ['-rf', '.next']);
      
      // Strategy 3: Retry build
      console.log('[INFO] Retrying build...');
      await runCommand('npx', ['next', 'build']);
      console.log('[SUCCESS] Build completed after cleanup');
      
    } catch (recoveryError) {
      console.error('[ERROR] Build recovery failed:', recoveryError.message);
      console.error('[ERROR] All build strategies exhausted');
      process.exit(1);
    }
  }
}

build(); 