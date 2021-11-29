
# Builder
FROM golang:1.17-alpine as builder

RUN apk update && apk upgrade && \
    apk --update add git make

WORKDIR /app

COPY go* ./

RUN go mod download

COPY . .

RUN make engine

# Distribution
FROM alpine:latest

RUN apk update && apk upgrade && \
    apk --update --no-cache add tzdata && \
    mkdir /app 

WORKDIR /app 

EXPOSE $PORT 

COPY --from=builder /app/engine /app
COPY --from=builder /app/dev.env /app/

CMD /app/engine