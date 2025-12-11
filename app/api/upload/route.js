import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ success: false, error: 'Geen bestand ontvangen' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    const filename = `${name}-${timestamp}${ext}`;

    // Save file
    const filepath = path.join(uploadsDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filepath, buffer);

    // Return the URL path
    const urlPath = `/uploads/${filename}`;

    return Response.json({ 
      success: true, 
      url: urlPath,
      filename: filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
