
migration-generate:
	if [ $(name) ]; then \
        docker compose exec api npm run migration:generate src/shared/migrations/$(name); \
    else \
        docker compose exec api npm run migration:generate src/shared/migrations/migration; \
    fi
