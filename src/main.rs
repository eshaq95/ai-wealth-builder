use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgPoolOptions;
use dotenv::dotenv;
use std::env;

#[derive(Serialize)]
struct Portfolio {
    total_value: f64,
    assets: Vec<Asset>,
}

#[derive(Serialize)]
struct Asset {
    name: String,
    value: f64,
}

async fn get_portfolio() -> impl Responder {
    let portfolio = Portfolio {
        total_value: 100000.0,
        assets: vec![
            Asset { name: "Stocks".to_string(), value: 50000.0 },
            Asset { name: "Bonds".to_string(), value: 30000.0 },
            Asset { name: "Cash".to_string(), value: 20000.0 },
        ],
    };
    HttpResponse::Ok().json(portfolio)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec!["Content-Type"]);

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .route("/api/portfolio", web::get().to(get_portfolio))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
