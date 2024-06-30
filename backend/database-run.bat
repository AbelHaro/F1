docker rm -f f1-sqlite3-server
docker build -t f1-sqlite3-server .
docker run --name f1-sqlite3-server -dit -p 5000:5000 f1-sqlite3-server