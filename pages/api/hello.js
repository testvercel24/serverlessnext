import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Books ( Title varchar(255), Author varchar(255),Description text, Image text );`;
    const books = [
      { Title: 'Book 1', Author: 'Author 1', Description: 'Description 1', Image: 'Image 1' },
      { Title: 'Book 2', Author: 'Author 2', Description: 'Description 2', Image: 'Image 2' },
      { Title: 'Book 3', Author: 'Author 3', Description: 'Description 3', Image: 'Image 3' }
    ];

    // Insert multiple rows of data into the table
    for (const book of books) {
      await client.query(`
        INSERT INTO Books (Title, Author, Description, Image)
        VALUES ($1, $2, $3, $4);
      `, [book.Title, book.Author, book.Description, book.Image]);
    }
    // const names = ['Fiona', 'Lucy'];
    // await client.sql`INSERT INTO Books (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  const books = await client.sql`SELECT * FROM Books;`;
  const data = books.map(({ Title, Author, Description, Image }) => ({ Title, Author, Description, Image }));
  return response.status(200).json(data);
}