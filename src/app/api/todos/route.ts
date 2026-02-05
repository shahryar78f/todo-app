import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
   
    await connectDB();

    // گرفتن سشن کاربر لاگین‌شده
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, status } = body;

    if (!title || !status) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid data!' },
        { status: 422 }
      );
    }

    user.todos.push({ title, status });
    await user.save();

    return NextResponse.json(
      { status: 'success', message: 'Todo created!' },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error in /api/todos POST:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while creating todo',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 }
    );
  }
}