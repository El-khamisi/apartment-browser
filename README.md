<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn-icons-png.flaticon.com/512/5988/5988246.png" width="120" alt="Nest Logo" /></a>
</p>

## Description

I aimed to simplify the process by implementing only the necessary parts to achieve the task's goals. All functionalities work on REST API and some of them work on UI.

This is a demo project created to fulfill the requirements of a technical assessment.

## Requirments

You'r gonna need just Docker to run and start the project

## Compile and run the project

```bash
$ cd apartment-browser
$ docker compose up
```

The Docker Compose projects will start the application along with PostgreSQL, pgAdmin, and MinIO (local file storage).

## Navigation

- Simple enduser **interface** runs on [http://localhost:5050/](http://localhost:3000/)
- **REST API** Documentation on [http://localhost:3000/docs](http://localhost:3000/docs)
- **pgadmin** exposed on [http://localhost:8070/](http://localhost:8070/)
- **minio** will serve files on [http://localhost:9000/](http://localhost:9000/)
