# Frontend

URL: http://localhost:4200

```bash
#START UI
npm run start
````

# Rest api

Server: http://localhost:8080/

- OpenApi (Swagger)
  - http://localhost:8080/swagger-ui.html
- Prometeus(endpoint)
  - http://localhost:8080/actuator/prometheus

---

## Monitoring: Prometheus & Grafana 
```bash
#Run in root folder
docker-compose up
````


- Prometheus URL: http://localhost:9090
- Grafana URL: http://localhost:3000

Grafana Credentials:
```
    - user: admin
    - pass: admin
````

---


## Logs:  ELK(Elastic-Logstash-Kibana) 
```bash
cd docker/docker-elk
docker-compose up
```

- KIBANA: http://localhost:7777

Credentials:
```
  - user: elastic 
  - pass: changeme
````

  
