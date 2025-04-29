const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const prisma = new PrismaClient();

// POST /api/booking - Create a new booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { availabilityId } = req.body;
    const studentId = req.user.userId;

    // Check if availability exists
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId },
      include: {
        instructor: {
          select: {
            email: true
          }
        }
      }
    });

    if (!availability) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        studentId,
        availabilityId,
        status: 'CONFIRMED'
      },
      include: {
        availability: true,
        student: {
          select: {
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking.id,
        status: booking.status,
        studentEmail: booking.student.email,
        instructorEmail: availability.instructor.email,
        dayOfWeek: booking.availability.dayOfWeek,
        startTime: booking.availability.startTime,
        endTime: booking.availability.endTime
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router; 