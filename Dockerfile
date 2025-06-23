# # -------- STAGE 1: Build --------
# # FROM node:18-alpine AS builder

# # WORKDIR /app

# # COPY package.json package-lock.json ./

# # RUN npm install

# # COPY . .

# # RUN npm run build


# # # -------- STAGE 2: Run --------
# # FROM node:18-alpine AS runner

# # WORKDIR /app

# # # Only copy what’s needed for running the app
# # COPY --from=builder /app/.next .next
# # COPY --from=builder /app/public public
# # COPY --from=builder /app/package*.json ./

# # RUN npm install --omit=dev

# # EXPOSE 3000

# # CMD ["npm", "run", "start"]

# EXPOSE 3000

# CMD ["npm", "run", "dev"]



FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- STAGE 2: Run --------
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]