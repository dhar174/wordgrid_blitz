# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and lock files from the 'src' directory
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code from 'src'
COPY src/ ./

# Run the build script
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Create a non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone Next.js server output from the builder stage
# This requires you to have `output: 'standalone'` in your next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the port environment variable
ENV PORT 3000

# The command to start the production server
CMD ["node", "server.js"]
