import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function GET() {
  try {
    const filePath = path.join(DATA_DIR, 'products.js');
    const content = await fs.readFile(filePath, 'utf8');
    
    // Parse the export from the file
    const match = content.match(/export const products = \[([\s\S]*)\];/);
    if (match) {
      return Response.json({ success: true, data: match[0] });
    }
    
    return Response.json({ success: false, error: 'Could not parse products' }, { status: 400 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { products } = await request.json();
    
    if (!products || !Array.isArray(products)) {
      return Response.json({ success: false, error: 'Invalid products data' }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, 'products.js');
    
    // Create the new file content
    const fileContent = `export const products = ${JSON.stringify(products, null, 2)};
`;

    await fs.writeFile(filePath, fileContent, 'utf8');
    
    return Response.json({ success: true, message: 'Products updated successfully' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
