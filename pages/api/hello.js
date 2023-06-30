import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  // response.setHeader('Access-Control-Allow-Origin', '*');

  // // Set the allowed HTTP methods
  // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // // Set the allowed headers
  // response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Books ( title varchar(255), author varchar(255),description text, image text );`;
    const books = [
      { Title: 'The Whispering Shadows', Author: 'Author 1', Description: 'In the dark alleys of the ancient city, a young detective embarks on a treacherous quest to solve a series of mysterious murders. As he delves deeper into the case, he uncovers a web of deceit and secrets that threaten to unravel the very fabric of society. With danger lurking at every turn and the shadows whispering their secrets, he must navigate a labyrinth of intrigue to uncover the truth before it consumes him.', Image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' },
      { Title: 'Beyond the Horizon', Author: 'Author 2', Description: 'Set in a dystopian future, this gripping tale follows a group of survivors as they venture beyond the safety of their enclave. With the world in ruins and resources scarce, they face untold dangers and encounter strange civilizations on their quest for a new home. Along the way, they grapple with their own inner demons, forge unlikely alliances, and discover the resilience of the human spirit in the face of adversit', Image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80' },
      { Title: 'The Lost Codex', Author: 'Author 3', Description: 'When an ancient manuscript resurfaces, it holds the key to unlocking a hidden secret that has remained buried for centuries. As scholars, archaeologists, and secret societies race to decipher its cryptic contents, they find themselves embroiled in a perilous race against time. Pursued by shadowy figures and facing ancient curses, they must navigate through historical enigmas and forgotten realms to safeguard the knowledge that could change the course of history', Image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' }
    ];
    // Insert multiple rows of data into the table
    for (const book of books) {
      await client.query(`
        INSERT INTO Books (title, author, description, image)
        VALUES ($1, $2, $3, $4);
      `, [book.Title, book.Author, book.Description, book.Image]);
    }
    // const names = ['Fiona', 'Lucy'];
    // await client.sql`INSERT INTO Books (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
  // await client.query(`TRUNCATE TABLE Pets;`);
  const client = await db.connect();
  const result = await client.query(`SELECT * FROM Books;`);
  const booksData = result.rows.map(({ title, author, description, image }) => ({ title, author, description, image }));
  return response.status(200).json(booksData);
}