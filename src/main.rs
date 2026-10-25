use axum::{routing::get, Json, Router};
use serde::Serialize;
use tokio::net::TcpListener;

#[derive(Serialize)]
struct User {
    id: u32,
    name: String,
    role: String,
}

async fn get_users() -> Json<Vec<User>> {
    Json(vec![
        User {
            id: 1,
            name: "Rava".to_string(),
            role: "Data Engineer".to_string(),
        },
        User {
            id: 2,
            name: "Alex".to_string(),
            role: "Developer".to_string(),
        },
    ])
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/users", get(get_users));

    let listener = TcpListener::bind("127.0.0.1:6767")
        .await
        .unwrap();

    println!("Server running at http://127.0.0.1:6767");

    axum::serve(listener, app).await.unwrap();
}