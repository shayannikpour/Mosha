const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// POST /api/instructor/availability - Create availability slot
router.post('/availability', authMiddleware, async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const userId = req.user.userId;

    // Check if user is an instructor
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.role !== 'INSTRUCTOR') {
      return res.status(403).json({ error: 'Only instructors can set availability' });
    }

    // Create availability
    const availability = await prisma.availability.create({
      data: {
        instructorId: userId,
        dayOfWeek,
        startTime,
        endTime
      }
    });

    res.status(201).json({
      message: 'Availability created successfully',
      availability
    });
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET /api/instructor/availability - Get all availability slots
router.get('/availability', async (req, res) => {
  try {
    const availabilities = await prisma.availability.findMany({
      include: {
        instructor: {
          select: {
            email: true
          }
        }
      }
    });

    // Transform the response to include instructorEmail
    const formattedAvailabilities = availabilities.map(availability => ({
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
      instructorId: availability.instructorId,
      instructorEmail: availability.instructor.email
    }));

    res.json(formattedAvailabilities);
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router; 