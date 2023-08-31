-- Active: 1692046027675@@127.0.0.1@5432@biblioteca
create database biblioteca;

create table "autores" (
  id serial primary key not null,
  nome text not null,
  idade integer
);


create table "livros" (
  id serial primary key not null,
  nome text not null,
  genero text,
  editora text,
  data_publicacao date,
  id_autor integer references autores(id)
);