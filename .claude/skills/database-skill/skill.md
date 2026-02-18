---
name: database-design-pro
description: Expert-level database architecture including relational modeling, zero-downtime migrations, and advanced query optimization.
---
Advanced Database Design & Management
Instructions
1. Relational Schema Modeling
Entity Mapping: Identify core entities and define cardinality (1:1, 1:N, N:M) to ensure data logic aligns with business requirements.Normalization & Performance: Apply normalization (1NF to 3NF) to prevent data duplication, but use strategic denormalization for high-read analytical paths.

Key Architecture: Define Primary Keys (UUIDs preferred for distributed systems) and Foreign Keys to enforce strict referential integrity.

2. Physical Table Implementation
Semantic Naming: Use clear, consistent, and meaningful table and column names (e.g., user_account instead of usr_tbl).

Optimal Data Typing: Select the most efficient types (e.g., JSONB for semi-structured data, TIMESTAMPTZ for global apps) to minimize storage footprint.

Integrity Constraints: Enforce data quality at the engine level using NOT NULL, UNIQUE, and CHECK constraints.3. Migration Lifecycle Management
Versioned Control: Create immutable, sequential migration files to track every schema change within version control.

Safe Operations: Design migrations to support atomic rollbacks and re-runs without data loss.

Granular Changes: Keep migration files small and focused on a single logical change to simplify debugging and deployment.

4. Indexing & Execution Performance
Strategic Indexing: Add B-Tree or Gin indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses.

Index Maintenance: Avoid over-indexing, which increases disk I/O and slows down INSERT/UPDATE operations.

Execution Planning: Use EXPLAIN ANALYZE to identify bottlenecks and optimize for a healthy read/write balance.Best Practices
Consistency: Follow a strict naming convention (e.g., snake_case) across all environments.

Scalability: Keep the schema simple enough to be horizontal-scale ready while remaining flexible for future features.

Automation: Never perform manual database changes; always use migrations to ensure environment parity.

Auditability: Document all schema changes and maintain created_at/updated_at timestamps on every table.

Validation: Always test migrations against a production-like dataset in a staging environment before deployment.Example Structure
SQL

-- migration: 20240109_create_users_table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Index for high-performance email lookups
CREATE INDEX idx_users_email ON users(email);