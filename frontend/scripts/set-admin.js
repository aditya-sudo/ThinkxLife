#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setUserAsAdmin() {
  try {
    console.log('🔍 Looking for user: jagadeshvarma07@gmail.com');
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: 'jagadeshvarma07@gmail.com' },
      select: { id: true, email: true, name: true, rolePrimary: true, status: true }
    });

    if (!user) {
      console.log('❌ User not found. Creating user...');
      
      // Create the user if they don't exist
      const newUser = await prisma.user.create({
        data: {
          email: 'jagadeshvarma07@gmail.com',
          name: 'Jagadesh Varma',
          rolePrimary: 'ADMIN',
          status: 'ACTIVE'
        }
      });
      
      console.log('✅ User created with ADMIN role:', newUser.email);
      return newUser;
    } else {
      console.log('✅ User found:', user.email, user.name);
      console.log('   Current role:', user.rolePrimary);
      console.log('   Current status:', user.status);
      
      // Update user to ADMIN if not already
      if (user.rolePrimary !== 'ADMIN') {
        const updatedUser = await prisma.user.update({
          where: { email: 'jagadeshvarma07@gmail.com' },
          data: { 
            rolePrimary: 'ADMIN',
            status: 'ACTIVE'
          }
        });
        console.log('🎯 User updated to ADMIN role!');
        return updatedUser;
      } else {
        console.log('✅ User already has ADMIN role');
        return user;
      }
    }

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  User already exists');
    } else {
      console.error('❌ Database error:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

setUserAsAdmin()
  .then(() => {
    console.log('\n🎉 Admin setup completed!');
    console.log('📋 Next steps:');
    console.log('   1. Run: npx prisma migrate dev --name add-rbac');
    console.log('   2. Then run this script again to set RBAC role');
  })
  .catch(console.error);
