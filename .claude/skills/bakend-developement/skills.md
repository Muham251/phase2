---

```yaml
---
name: backend-development
description: Architect robust server-side logic including RESTful routing, request lifecycle management, and secure database integration.
---

```

# Backend Architecture & API Development

## Instructions

1. **Route Generation & Management**
* Define clear, semantic RESTful endpoints (e.g., `GET /api/v1/users`).
* Implement versioning to ensure backward compatibility as the API evolves.
* Organize routes into modular controllers or routers to maintain code readability.
* Apply middleware for cross-cutting concerns like authentication and logging.


2. **Request & Response Handling**
* Extract and validate data from headers, query parameters, and request bodies.
* Implement robust error handling to catch and return meaningful HTTP status codes (e.g., 400 for Bad Request, 404 for Not Found).
* Standardize JSON response structures for consistency across the frontend.
* Sanitize all incoming data to prevent injection attacks and ensure data integrity.


3. **Database Connectivity & Operations**
* Establish secure connection pools to the database using environment-specific configurations.
* Utilize an ORM (Object-Relational Mapper) or Query Builder for type-safe data interactions.
* Implement asynchronous operations to prevent blocking the event loop during heavy I/O.
* Use transactions for multi-step operations to ensure "all-or-nothing" data consistency.



## Best Practices

* **Statelessness:** Design routes to be stateless, relying on tokens (like JWT) rather than server-side sessions for better scalability.
* **Environment Safety:** Never hardcode database credentials; always use `.env` files.
* **Rate Limiting:** Protect endpoints from abuse by implementing rate limiting and throttling.
* **Documentation:** Use tools like Swagger or Postman to keep API documentation in sync with your code.
* **Graceful Shutdowns:** Ensure the server closes database connections and finishes pending requests before exiting.

## Example Structure

```ts
// Example Express.js Route Handler
import { Router, Request, Response } from 'express';
import { db } from './database';

const router = Router();

// 1. Define Route
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    // 2. Handle Request params
    const { id } = req.params;

    // 3. Connect to DB & Fetch
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 4. Return Response
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

```

---
