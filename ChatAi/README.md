<!-- markdownlint-disable MD030 -->

<p align="center">
  <img src="https://github.com/restuusgh/Surya-teknologi-nasional/blob/main/ChatAi/assets/logo_chat_ai.svg" alt="ChatAi Logo" width="200"/>
</p>

<div align="center">

# 🤖 ChatAi


</div>

<h3 align="center"> Chatbot AI yang di buat oleh anak magang uninus</h3>

<p align="center">
  <img width="100%" src="https://github.com/restuusgh/Surya-teknologi-nasional/blob/main/ChatAi/assets/preview.gif" alt="ChatAi Preview">
</p>


## ⚡ Quick Start

Pastikan kamu sudah menginstal [NodeJS](https://nodejs.org/en/download) minimal versi **18.15.0** dan **pnpm**.

1. Clone repository
    ```bash
    git clone https://github.com/restuusgh/Surya-teknologi-nasional.git
    cd ChatAi
    ```

2. Install dependensi menggunakan pnpm
    ```bash
    pnpm install
    ```
3. Build seluruh package
   ```bash
   pnpm build
   ```

4. Jalankan aplikasi (mode development)
    ```bash
    pnpm start
    ```

5. Akses di browser:
    👉 [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker

### Menjalankan dengan Docker Compose
1. Buka folder `docker/` di dalam ChatAi.
2. Salin file `.env.example` menjadi `.env`.
3. Jalankan:
    ```bash
    docker compose up -d
    ```
4. Akses di [http://localhost:3000](http://localhost:3000)

Hentikan container:
```bash
docker compose stop
