import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }

    const { name, lastName, password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { status: 'failed', message: 'Password is required!' },
        { status: 422 },
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { status: 'failed', message: 'password is incorrect!' },
        { status: 401 },
      );
    }

    user.name = name;
    user.lastName = lastName;
    await user.save();


    return NextResponse.json({ status: 'success', message: 'Profile updated!' }, { status: 200 });
  } catch (err: any) {
    console.error('Error in /api/profile POST:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while updating profile',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: 'success',
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  } catch (err: any) {
    console.error('Error in /api/profile GET:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while fetching profile',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { name, lastName } = body;

    if (name !== undefined) user.name = name;
    if (lastName !== undefined) user.lastName = lastName;
    await user.save();

    return NextResponse.json(
      { status: 'success', message: 'Profile updated!', data: { name: user.name, lastName: user.lastName } },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('Error in /api/profile PUT:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while updating profile',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 },
    );
  }
}
