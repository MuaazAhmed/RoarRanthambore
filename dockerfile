# ── Stage 1: Build React frontend ──────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files and install deps
COPY frontend/package*.json ./
RUN npm ci

# Copy source and build
COPY frontend/ ./
RUN npm run build


# ── Stage 2: Build Go backend ───────────────────────────────────────────────────
FROM golang:1.23-alpine AS backend-builder

WORKDIR /app

# Copy go mod files and download deps
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy backend source
COPY backend/ ./

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server .


# ── Stage 3: Final minimal image ────────────────────────────────────────────────
FROM alpine:3.19

WORKDIR /app

# Add CA certs for HTTPS calls if needed
RUN apk --no-cache add ca-certificates tzdata

# Copy binary from backend builder
COPY --from=backend-builder /app/server ./server

# Copy React build from frontend builder
COPY --from=frontend-builder /app/frontend/build ./build

# .env will be mounted as a volume at runtime — not baked in
EXPOSE 8080

CMD ["./server"]