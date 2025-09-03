--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: Job_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."Job_type" AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACT',
    'FREELANCE',
    'INTERNSHIP'
);


ALTER TYPE public."Job_type" OWNER TO admin;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."Status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE public."Status" OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "resetOtp" text,
    "otpExpiry" timestamp(3) without time zone,
    access_token text,
    refresh_token text
);


ALTER TABLE public."Admin" OWNER TO admin;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admin_id_seq" OWNER TO admin;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: Applications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Applications" (
    id integer NOT NULL,
    "applicantName" text NOT NULL,
    email text NOT NULL,
    "phoneNo" integer NOT NULL,
    applied_for integer NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    qualification text[],
    cover_letter text,
    resume text NOT NULL,
    status public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Applications" OWNER TO admin;

--
-- Name: Applications_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Applications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Applications_id_seq" OWNER TO admin;

--
-- Name: Applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Applications_id_seq" OWNED BY public."Applications".id;


--
-- Name: Blogs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Blogs" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text,
    "thumbnailImg" text NOT NULL,
    images text[],
    tags text[],
    category text[],
    show boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    slug text NOT NULL,
    "authorName" text NOT NULL
);


ALTER TABLE public."Blogs" OWNER TO admin;

--
-- Name: Blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Blogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Blogs_id_seq" OWNER TO admin;

--
-- Name: Blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Blogs_id_seq" OWNED BY public."Blogs".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    category_name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO admin;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO admin;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Contact; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Contact" (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Contact" OWNER TO admin;

--
-- Name: Contact_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Contact_id_seq" OWNER TO admin;

--
-- Name: Contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Contact_id_seq" OWNED BY public."Contact".id;


--
-- Name: Cookies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Cookies" (
    id uuid NOT NULL,
    ip text,
    location jsonb,
    browser jsonb,
    os jsonb,
    device jsonb,
    cpu jsonb,
    engine jsonb,
    ua text,
    "isBot" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cookies" OWNER TO admin;

--
-- Name: FAQ; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."FAQ" (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public."FAQ" OWNER TO admin;

--
-- Name: FAQ_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."FAQ_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FAQ_id_seq" OWNER TO admin;

--
-- Name: FAQ_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."FAQ_id_seq" OWNED BY public."FAQ".id;


--
-- Name: SEO; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."SEO" (
    id integer NOT NULL,
    route text NOT NULL,
    title text,
    description text,
    keywords text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SEO" OWNER TO admin;

--
-- Name: SEO_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."SEO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SEO_id_seq" OWNER TO admin;

--
-- Name: SEO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."SEO_id_seq" OWNED BY public."SEO".id;


--
-- Name: Skills; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Skills" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Skills" OWNER TO admin;

--
-- Name: Skills_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Skills_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Skills_id_seq" OWNER TO admin;

--
-- Name: Skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Skills_id_seq" OWNED BY public."Skills".id;


--
-- Name: Vacancies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Vacancies" (
    id integer NOT NULL,
    "JobTitle" text NOT NULL,
    "Job_Description" text NOT NULL,
    "Min_exp" integer NOT NULL,
    "Max_exp" integer NOT NULL,
    "Job_type" public."Job_type" NOT NULL,
    "Salary" text,
    "Primary_Skills" text[],
    "Secondary_Skills" text[],
    "Show" boolean NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vacancies" OWNER TO admin;

--
-- Name: Vacancies_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Vacancies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vacancies_id_seq" OWNER TO admin;

--
-- Name: Vacancies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Vacancies_id_seq" OWNED BY public."Vacancies".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: Applications id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Applications" ALTER COLUMN id SET DEFAULT nextval('public."Applications_id_seq"'::regclass);


--
-- Name: Blogs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Blogs" ALTER COLUMN id SET DEFAULT nextval('public."Blogs_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Contact id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Contact" ALTER COLUMN id SET DEFAULT nextval('public."Contact_id_seq"'::regclass);


--
-- Name: FAQ id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."FAQ" ALTER COLUMN id SET DEFAULT nextval('public."FAQ_id_seq"'::regclass);


--
-- Name: SEO id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SEO" ALTER COLUMN id SET DEFAULT nextval('public."SEO_id_seq"'::regclass);


--
-- Name: Skills id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Skills" ALTER COLUMN id SET DEFAULT nextval('public."Skills_id_seq"'::regclass);


--
-- Name: Vacancies id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Vacancies" ALTER COLUMN id SET DEFAULT nextval('public."Vacancies_id_seq"'::regclass);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: Applications Applications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Applications"
    ADD CONSTRAINT "Applications_pkey" PRIMARY KEY (id);


--
-- Name: Blogs Blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Blogs"
    ADD CONSTRAINT "Blogs_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Contact Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


--
-- Name: Cookies Cookies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Cookies"
    ADD CONSTRAINT "Cookies_pkey" PRIMARY KEY (id);


--
-- Name: FAQ FAQ_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."FAQ"
    ADD CONSTRAINT "FAQ_pkey" PRIMARY KEY (id);


--
-- Name: SEO SEO_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SEO"
    ADD CONSTRAINT "SEO_pkey" PRIMARY KEY (id);


--
-- Name: Skills Skills_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Skills"
    ADD CONSTRAINT "Skills_pkey" PRIMARY KEY (id);


--
-- Name: Vacancies Vacancies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Vacancies"
    ADD CONSTRAINT "Vacancies_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Admin_email_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Admin_email_idx" ON public."Admin" USING btree (email);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Admin_resetOtp_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Admin_resetOtp_key" ON public."Admin" USING btree ("resetOtp");


--
-- Name: Blogs_createdAt_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Blogs_createdAt_idx" ON public."Blogs" USING btree ("createdAt");


--
-- Name: Blogs_show_createdAt_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Blogs_show_createdAt_idx" ON public."Blogs" USING btree (show, "createdAt");


--
-- Name: Blogs_show_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Blogs_show_idx" ON public."Blogs" USING btree (show);


--
-- Name: Blogs_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Blogs_slug_idx" ON public."Blogs" USING btree (slug);


--
-- Name: Blogs_slug_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Blogs_slug_key" ON public."Blogs" USING btree (slug);


--
-- Name: Blogs_title_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Blogs_title_key" ON public."Blogs" USING btree (title);


--
-- Name: Category_category_name_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Category_category_name_idx" ON public."Category" USING btree (category_name);


--
-- Name: Category_category_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Category_category_name_key" ON public."Category" USING btree (category_name);


--
-- Name: Contact_createdAt_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Contact_createdAt_idx" ON public."Contact" USING btree ("createdAt");


--
-- Name: Contact_email_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Contact_email_idx" ON public."Contact" USING btree (email);


--
-- Name: Contact_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Contact_email_key" ON public."Contact" USING btree (email);


--
-- Name: FAQ_createdAt_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "FAQ_createdAt_idx" ON public."FAQ" USING btree ("createdAt");


--
-- Name: SEO_route_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "SEO_route_idx" ON public."SEO" USING btree (route);


--
-- Name: SEO_route_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "SEO_route_key" ON public."SEO" USING btree (route);


--
-- Name: Skills_name_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Skills_name_idx" ON public."Skills" USING btree (name);


--
-- Name: Skills_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Skills_name_key" ON public."Skills" USING btree (name);


--
-- Name: Applications Applications_applied_for_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Applications"
    ADD CONSTRAINT "Applications_applied_for_fkey" FOREIGN KEY (applied_for) REFERENCES public."Vacancies"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

