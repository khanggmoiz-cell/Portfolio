import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8')
    const projects = JSON.parse(data)
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
  }
}
