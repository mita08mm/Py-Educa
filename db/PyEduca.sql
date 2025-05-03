/*==============================================================*/
/* DBMS name:      PostgreSQL 13.x                               */
/* Created on:     5/2/2025 9:28:23 PM                          */
/*==============================================================*/

-- Primero eliminamos los índices y tablas existentes

drop index if exists TIENE_CONTENIDO_FK;

drop index if exists CLASIFICA_CONTENIDO_FK;

drop index if exists CONTENIDO_PK;

drop table if exists CONTENIDO;

drop index if exists CURSO_PK;

drop table if exists CURSO;

drop index if exists TIENE_EJEMPLOS_FK;

drop index if exists EJEMPLOS_PK;

drop table if exists EJEMPLOS;

drop index if exists TIENE_EVALUACION_FK;

drop index if exists EVALUACION_PK;

drop table if exists EVALUACION;

drop index if exists TIENEN_MODULO_FK;

drop index if exists MODULO_PK;

drop table if exists MODULO;

drop index if exists MULTILMEDIA_PK;

drop table if exists MULTILMEDIA;

drop index if exists TIENE_PROBLEMAS_FK;

drop index if exists TIENE_PROBLEMA_FK;

drop index if exists PROBLEMA_PK;

drop table if exists PROBLEMA;

drop index if exists TIENE_PROGRESO_FK;

drop index if exists TIENE_PROGRESO_SECCION_FK;

drop index if exists PROGRESO_PK;

drop table if exists PROGRESO;

drop index if exists ROL_PK;

drop table if exists ROL;

drop index if exists TIENE_SECCIONES_FK;

drop index if exists SECCION_PK;

drop table if exists SECCION;

drop index if exists TIENE_SUBSECCIONES_FK;

drop index if exists SUBSECCION_PK;

drop table if exists SUBSECCION;

drop index if exists TIENE_ROL_FK;

drop index if exists USUARIO_PK;

drop table if exists USUARIO;

drop index if exists TIENE_CURSOS_FK;

drop index if exists TIENE_USUARIOS_FK;

drop index if exists USUARIO_CURSO_PK;

drop table if exists USUARIO_CURSO;


/*==============================================================*/
/* Table: CONTENIDO                                             */
/*==============================================================*/
create table CONTENIDO (
   COD_MODULO           INT                 not null,
   COD_SECCION          INT                 not null,
   COD_SUBSECCION       INT                 not null,
   COD_CONTENIDO        SERIAL              not null,
   COD_MULTIMEDIA       INT                 not null,
   CONTENDIDO           VARCHAR(200)        not null,
   DESCRIPCION          TEXT                null,
   constraint PK_CONTENIDO primary key (COD_MODULO, COD_SECCION, COD_SUBSECCION, COD_CONTENIDO)
);

/*==============================================================*/
/* Index: CONTENIDO_PK                                          */
/*==============================================================*/
create unique index CONTENIDO_PK on CONTENIDO (
COD_MODULO,
COD_SECCION,
COD_SUBSECCION,
COD_CONTENIDO
);

/*==============================================================*/
/* Index: CLASIFICA_CONTENIDO_FK                                */
/*==============================================================*/
create index CLASIFICA_CONTENIDO_FK on CONTENIDO (
COD_MULTIMEDIA
);

/*==============================================================*/
/* Index: TIENE_CONTENIDO_FK                                    */
/*==============================================================*/
create index TIENE_CONTENIDO_FK on CONTENIDO (
COD_MODULO,
COD_SECCION,
COD_SUBSECCION
);


/*==============================================================*/
/* Table: CURSO                                                 */
/*==============================================================*/
create table CURSO (
   COD_CURSO            SERIAL              not null,
   TITULO_CURSO         VARCHAR(50)         not null,
   DESCRIPCION_CURSO    TEXT                null,
   constraint PK_CURSO primary key (COD_CURSO)
);

/*==============================================================*/
/* Index: CURSO_PK                                              */
/*==============================================================*/
create unique index CURSO_PK on CURSO (
COD_CURSO
);


/*==============================================================*/
/* Table: EJEMPLOS                                              */
/*==============================================================*/
create table EJEMPLOS (
   COD_PROBLEMA         INT                 not null,
   COD_EJEMPLO          SERIAL              not null,
   INPUT_EJEMPLO        TEXT                not null,
   OUPUT_EJEMPLO        TEXT                not null,
   constraint PK_EJEMPLOS primary key (COD_PROBLEMA, COD_EJEMPLO)
);

/*==============================================================*/
/* Index: EJEMPLOS_PK                                           */
/*==============================================================*/
create unique index EJEMPLOS_PK on EJEMPLOS (
COD_PROBLEMA,
COD_EJEMPLO
);

/*==============================================================*/
/* Index: TIENE_EJEMPLOS_FK                                     */
/*==============================================================*/
create index TIENE_EJEMPLOS_FK on EJEMPLOS (
COD_PROBLEMA
);


/*==============================================================*/
/* Table: EVALUACION                                            */
/*==============================================================*/
create table EVALUACION (
   COD_EVALUACION       SERIAL              not null,
   COD_MODULO           INT                 null,
   COD_SECCION          INT                 null,
   constraint PK_EVALUACION primary key (COD_EVALUACION)
);

/*==============================================================*/
/* Index: EVALUACION_PK                                         */
/*==============================================================*/
create unique index EVALUACION_PK on EVALUACION (
COD_EVALUACION
);

/*==============================================================*/
/* Index: TIENE_EVALUACION_FK                                   */
/*==============================================================*/
create index TIENE_EVALUACION_FK on EVALUACION (
COD_MODULO,
COD_SECCION
);


/*==============================================================*/
/* Table: MODULO                                                */
/*==============================================================*/
create table MODULO (
   COD_MODULO           SERIAL              not null,
   COD_CURSO            INT                 not null,
   TITULO_MODULO        VARCHAR(256)        not null,
   DESCRIPCION_MODULO   TEXT                null,
   constraint PK_MODULO primary key (COD_MODULO)
);

/*==============================================================*/
/* Index: MODULO_PK                                             */
/*==============================================================*/
create unique index MODULO_PK on MODULO (
COD_MODULO
);

/*==============================================================*/
/* Index: TIENEN_MODULO_FK                                      */
/*==============================================================*/
create index TIENEN_MODULO_FK on MODULO (
COD_CURSO
);


/*==============================================================*/
/* Table: MULTILMEDIA                                           */
/*==============================================================*/
create table MULTILMEDIA (
   COD_MULTIMEDIA       SERIAL              not null,
   TIPO_MULTIMEDIA      VARCHAR(50)         not null,
   constraint PK_MULTILMEDIA primary key (COD_MULTIMEDIA)
);

/*==============================================================*/
/* Index: MULTILMEDIA_PK                                        */
/*==============================================================*/
create unique index MULTILMEDIA_PK on MULTILMEDIA (
COD_MULTIMEDIA
);


/*==============================================================*/
/* Table: PROBLEMA                                              */
/*==============================================================*/
create table PROBLEMA (
   COD_PROBLEMA         SERIAL              not null,
   COD_EVALUACION       INT                 null,
   COD_MODULO           INT                 null,
   COD_SECCION          INT                 null,
   COD_SUBSECCION       INT                 null,
   TITULO_PROBLEMA      VARCHAR(100)        not null,
   DESCRIPCION_PROBLEMA TEXT                not null,
   INPUT                TEXT                not null,
   OUTPUT               TEXT                not null,
   constraint PK_PROBLEMA primary key (COD_PROBLEMA)
);

/*==============================================================*/
/* Index: PROBLEMA_PK                                           */
/*==============================================================*/
create unique index PROBLEMA_PK on PROBLEMA (
COD_PROBLEMA
);

/*==============================================================*/
/* Index: TIENE_PROBLEMA_FK                                     */
/*==============================================================*/
create index TIENE_PROBLEMA_FK on PROBLEMA (
COD_MODULO,
COD_SECCION,
COD_SUBSECCION
);

/*==============================================================*/
/* Index: TIENE_PROBLEMAS_FK                                    */
/*==============================================================*/
create index TIENE_PROBLEMAS_FK on PROBLEMA (
COD_EVALUACION
);


/*==============================================================*/
/* Table: PROGRESO                                              */
/*==============================================================*/
create table PROGRESO (
   COD_CURSO            INT                 not null,
   COD_USUARIO          INT                 not null,
   COD_MODULO           INT                 not null,
   COD_SECCION          INT                 not null,
   TOTAL                INT                 not null,
   TOTAL_TERMINADO      INT                 not null,
   constraint PK_PROGRESO primary key (COD_CURSO, COD_USUARIO, COD_MODULO, COD_SECCION)
);

/*==============================================================*/
/* Index: PROGRESO_PK                                           */
/*==============================================================*/
create unique index PROGRESO_PK on PROGRESO (
COD_CURSO,
COD_USUARIO,
COD_MODULO,
COD_SECCION
);

/*==============================================================*/
/* Index: TIENE_PROGRESO_SECCION_FK                             */
/*==============================================================*/
create index TIENE_PROGRESO_SECCION_FK on PROGRESO (
COD_CURSO,
COD_USUARIO
);

/*==============================================================*/
/* Index: TIENE_PROGRESO_FK                                     */
/*==============================================================*/
create index TIENE_PROGRESO_FK on PROGRESO (
COD_MODULO,
COD_SECCION
);


/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   COD_ROL              SERIAL              not null,
   ROL                  VARCHAR(30)         not null,
   constraint PK_ROL primary key (COD_ROL)
);

/*==============================================================*/
/* Index: ROL_PK                                                */
/*==============================================================*/
create unique index ROL_PK on ROL (
COD_ROL
);


/*==============================================================*/
/* Table: SECCION                                               */
/*==============================================================*/
create table SECCION (
   COD_MODULO           INT                 not null,
   COD_SECCION          SERIAL              not null,
   TITULO_SECCION       VARCHAR(256)        not null,
   DESCRIPCION_SECCION  TEXT                null,
   constraint PK_SECCION primary key (COD_MODULO, COD_SECCION)
);

/*==============================================================*/
/* Index: SECCION_PK                                            */
/*==============================================================*/
create unique index SECCION_PK on SECCION (
COD_MODULO,
COD_SECCION
);

/*==============================================================*/
/* Index: TIENE_SECCIONES_FK                                    */
/*==============================================================*/
create index TIENE_SECCIONES_FK on SECCION (
COD_MODULO
);


/*==============================================================*/
/* Table: SUBSECCION                                            */
/*==============================================================*/
create table SUBSECCION (
   COD_MODULO           INT                 not null,
   COD_SECCION          INT                 not null,
   COD_SUBSECCION       SERIAL              not null,
   TITULO_SUBSECCION    VARCHAR(256)        not null,
   DESCRIPCION_SUBSECCION TEXT               null,
   constraint PK_SUBSECCION primary key (COD_MODULO, COD_SECCION, COD_SUBSECCION)
);

/*==============================================================*/
/* Index: SUBSECCION_PK                                         */
/*==============================================================*/
create unique index SUBSECCION_PK on SUBSECCION (
COD_MODULO,
COD_SECCION,
COD_SUBSECCION
);

/*==============================================================*/
/* Index: TIENE_SUBSECCIONES_FK                                 */
/*==============================================================*/
create index TIENE_SUBSECCIONES_FK on SUBSECCION (
COD_MODULO,
COD_SECCION
);


/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   COD_USUARIO          SERIAL              not null,
   COD_ROL              INT                 not null,
   NOMBRE               VARCHAR(256)        not null,
   USUARIO              VARCHAR(20)         not null,
   PASSWORD             VARCHAR(256)        not null,
   EMAIL                VARCHAR(256)        not null,
   constraint PK_USUARIO primary key (COD_USUARIO)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
COD_USUARIO
);

/*==============================================================*/
/* Index: TIENE_ROL_FK                                          */
/*==============================================================*/
create index TIENE_ROL_FK on USUARIO (
COD_ROL
);


/*==============================================================*/
/* Table: USUARIO_CURSO                                         */
/*==============================================================*/
create table USUARIO_CURSO (
   COD_CURSO            INT                 not null,
   COD_USUARIO          INT                 not null,
   constraint PK_USUARIO_CURSO primary key (COD_CURSO, COD_USUARIO)
);

/*==============================================================*/
/* Index: USUARIO_CURSO_PK                                      */
/*==============================================================*/
create unique index USUARIO_CURSO_PK on USUARIO_CURSO (
COD_CURSO,
COD_USUARIO
);

/*==============================================================*/
/* Index: TIENE_USUARIOS_FK                                     */
/*==============================================================*/
create index TIENE_USUARIOS_FK on USUARIO_CURSO (
COD_CURSO
);

/*==============================================================*/
/* Index: TIENE_CURSOS_FK                                       */
/*==============================================================*/
create index TIENE_CURSOS_FK on USUARIO_CURSO (
COD_USUARIO
);

-- Ahora se crean las restricciones de las claves foráneas

alter table CONTENIDO
   add constraint FK_CONTENID_CLASIFICA_MULTILME foreign key (COD_MULTIMEDIA)
      references MULTILMEDIA (COD_MULTIMEDIA)
      on delete restrict on update restrict;

alter table CONTENIDO
   add constraint FK_CONTENID_TIENE_CON_SUBSECCI foreign key (COD_MODULO, COD_SECCION, COD_SUBSECCION)
      references SUBSECCION (COD_MODULO, COD_SECCION, COD_SUBSECCION)
      on delete restrict on update restrict;

alter table EJEMPLOS
   add constraint FK_EJEMPLOS_TIENE_EJE_PROBLEMA foreign key (COD_PROBLEMA)
      references PROBLEMA (COD_PROBLEMA)
      on delete restrict on update restrict;

alter table EVALUACION
   add constraint FK_EVALUACI_TIENE_EVA_SECCION foreign key (COD_MODULO, COD_SECCION)
      references SECCION (COD_MODULO, COD_SECCION)
      on delete restrict on update restrict;

alter table MODULO
   add constraint FK_MODULO_TIENEN_MO_CURSO foreign key (COD_CURSO)
      references CURSO (COD_CURSO)
      on delete restrict on update restrict;

alter table PROBLEMA
   add constraint FK_PROBLEMA_TIENE_PRO_SUBSECCI foreign key (COD_MODULO, COD_SECCION, COD_SUBSECCION)
      references SUBSECCION (COD_MODULO, COD_SECCION, COD_SUBSECCION)
      on delete restrict on update restrict;

alter table PROBLEMA
   add constraint FK_PROBLEMA_TIENE_PRO_EVALUACI foreign key (COD_EVALUACION)
      references EVALUACION (COD_EVALUACION)
      on delete restrict on update restrict;

alter table PROGRESO
   add constraint FK_PROGRESO_TIENE_PRO_SECCION foreign key (COD_MODULO, COD_SECCION)
      references SECCION (COD_MODULO, COD_SECCION)
      on delete restrict on update restrict;

alter table PROGRESO
   add constraint FK_PROGRESO_TIENE_PRO_USUARIO_ foreign key (COD_CURSO, COD_USUARIO)
      references USUARIO_CURSO (COD_CURSO, COD_USUARIO)
      on delete restrict on update restrict;

alter table SECCION
   add constraint FK_SECCION_TIENE_SEC_MODULO foreign key (COD_MODULO)
      references MODULO (COD_MODULO)
      on delete restrict on update restrict;

alter table SUBSECCION
   add constraint FK_SUBSECCI_TIENE_SUB_SECCION foreign key (COD_MODULO, COD_SECCION)
      references SECCION (COD_MODULO, COD_SECCION)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_TIENE_ROL_ROL foreign key (COD_ROL)
      references ROL (COD_ROL)
      on delete restrict on update restrict;

alter table USUARIO_CURSO
   add constraint FK_USUARIO__TIENE_CUR_USUARIO foreign key (COD_USUARIO)
      references USUARIO (COD_USUARIO)
      on delete restrict on update restrict;

alter table USUARIO_CURSO
   add constraint FK_USUARIO__TIENE_USU_CURSO foreign key (COD_CURSO)
      references CURSO (COD_CURSO)
      on delete restrict on update restrict;

