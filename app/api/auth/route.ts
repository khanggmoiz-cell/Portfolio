import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'sastadeveloper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return NextResponse.json({ success: true, token: 'admin-authenticated' })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
