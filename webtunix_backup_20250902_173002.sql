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
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Admin" (id, name, email, password, "resetOtp", "otpExpiry", access_token, refresh_token) FROM stdin;
1	Admin	webtunix.developers@gmail.com	$2b$10$aq.mrV9YGjLiT8sIMzPHbeVnkApRYHoN3Ru0tQRnhMQbbISTfs1Ne	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3ZWJ0dW5peC5kZXZlbG9wZXJzQGdtYWlsLmNvbSIsImlhdCI6MTc1NjcxNDUxMCwiZXhwIjoxNzU2NzIxNzEwfQ.TstAe5Y22A_Ypmxyvn6bgjmc3Dpx_CrqVoim29dBlwk	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3ZWJ0dW5peC5kZXZlbG9wZXJzQGdtYWlsLmNvbSIsImlhdCI6MTc1NjcxNDUxMCwiZXhwIjoxNzU3MzE5MzEwfQ.60aBHLcz8QcgKeKptDFtuU0t2tyg9S7syaAcloFV3C4
\.


--
-- Data for Name: Applications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Applications" (id, "applicantName", email, "phoneNo", applied_for, start_date, qualification, cover_letter, resume, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Blogs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Blogs" (id, title, description, content, "thumbnailImg", images, tags, category, show, "createdAt", "updatedAt", slug, "authorName") FROM stdin;
1	Exploring the Hidden Beaches of Bali	A guide to discovering Bali's lesser-known yet breathtaking beaches.	Bali has many beaches beyond the tourist hotspots. From quiet coves to secret surfing spots, here's where to go...	https://images.unsplash.com/photo-1507525428034-b723cf961d3e	\N	{travel,beach,bali}	{travel,adventure}	t	2025-08-14 10:16:14.353	2025-08-14 10:16:14.353	hidden-beaches-bali	Sofia Tan
2	10-Minute Healthy Breakfast Ideas	Quick and nutritious breakfast recipes for busy mornings.	Mornings can be hectic, but that doesn’t mean you can’t enjoy a healthy breakfast...	https://images.unsplash.com/photo-1504674900247-0877df9cc836	\N	{food,health,recipes}	{lifestyle,food}	t	2025-08-14 10:16:55.304	2025-08-14 10:16:55.304	healthy-breakfast-ideas	James Carter
3	Beginner’s Guide to Digital Photography	Essential tips for anyone starting their photography journey.	Photography can be overwhelming at first. In this guide, we’ll cover the basics you need to know...	https://images.unsplash.com/photo-1519183071298-a2962eadcdb2	\N	{photography,camera,beginners}	{hobby,education}	t	2025-08-14 10:17:44.298	2025-08-14 10:17:44.298	digital-photography-guide	Liam Brooks
4	Top 5 Yoga Poses for Stress Relief	Simple yoga poses to help you relax and improve mental well-being.	Yoga is a great way to manage stress. Here are five easy poses you can do anywhere...	https://images.unsplash.com/photo-1554311885-962d3d0f3a77	\N	{yoga,wellness,health}	{fitness,health}	t	2025-08-14 10:18:12.453	2025-08-14 10:18:12.453	yoga-poses-stress-relief	Priya Mehta
5	Mastering the Art of Coffee Brewing	From pour-over to espresso, learn how to brew the perfect cup.	Brewing coffee is an art. This guide covers various brewing methods and tips for each...	https://images.unsplash.com/photo-1509042239860-f550ce710b93	\N	{coffee,brewing,barista}	{food,lifestyle}	t	2025-08-14 10:18:33.364	2025-08-14 10:18:33.364	coffee-brewing-guide	Ethan Brown
6	A Minimalist’s Guide to Decluttering	Steps to simplify your living space and embrace minimalism.	Minimalism isn’t just about having fewer things—it’s about living with intention...	https://images.unsplash.com/photo-1487014679447-9f8336841d58	{https://images.unsplash.com/photo-1487014679447-9f8336841d58,https://images.unsplash.com/photo-1505691938895-1758d7feb511}	{minimalism,home,lifestyle}	{lifestyle,self-help}	t	2025-08-14 10:21:56.851	2025-08-14 10:21:56.851	minimalist-decluttering-guide	Hannah Lee
7	The Future of Electric Vehicles	Trends and predictions shaping the EV industry.	Electric vehicles are changing the way we think about transportation...	https://images.unsplash.com/photo-1601924582971-c7a67bfa6d12	{https://images.unsplash.com/photo-1601924582971-c7a67bfa6d12,https://images.unsplash.com/photo-1618843006694-c1e1a9c4a0d2}	{ev,cars,technology}	{technology,automotive}	t	2025-08-14 10:22:37.815	2025-08-14 10:22:37.815	future-of-electric-vehicles	David Kim
8	Best Hiking Trails in the Alps	A curated list of breathtaking trails in the European Alps.	The Alps offer some of the most scenic hiking trails in the world...	https://images.unsplash.com/photo-1500530855697-b586d89ba3ee	{https://images.unsplash.com/photo-1500530855697-b586d89ba3ee,https://images.unsplash.com/photo-1500534314209-a25ddb2bd429}	{hiking,nature,adventure}	{travel,adventure}	t	2025-08-14 10:23:05.032	2025-08-14 10:23:05.032	hiking-trails-alps	Isabella Schmidt
9	How to Start a Small Business Online	Step-by-step guide to building a profitable online business.	Starting a small business online has never been easier, but it requires planning...	https://images.unsplash.com/photo-1504384308090-c894fdcc538d	{https://images.unsplash.com/photo-1504384308090-c894fdcc538d,https://images.unsplash.com/photo-1484981138541-3d074aa97716}	{business,entrepreneurship,startup}	{business,finance}	t	2025-08-14 10:23:25.512	2025-08-14 10:23:25.512	start-small-business-online	Michael Johnson
10	Mastering Italian Pasta at Home	Traditional recipes and tips for perfect homemade pasta.	Making pasta from scratch is easier than you think...	https://images.unsplash.com/photo-1510626176961-4b57d4fbad03	{https://images.unsplash.com/photo-1510626176961-4b57d4fbad03,https://images.unsplash.com/photo-1604908177529-1c1a53b2b8cc}	{pasta,italian,cooking}	{food,culture}	f	2025-08-14 10:23:51.818	2025-08-14 10:23:51.818	mastering-italian-pasta	Giulia Rossi
11	The Science of Sleep: How to Improve Your Rest	Understand the importance of sleep and how to enhance its quality.	Sleep affects nearly every system in your body. Here’s how to optimize it...	https://images.unsplash.com/photo-1505691938895-1758d7feb511	{https://images.unsplash.com/photo-1505691938895-1758d7feb511,https://images.unsplash.com/photo-1505691723518-36a9f2e7f63b}	{health,sleep,wellness}	{health,lifestyle}	t	2025-08-14 10:25:12.118	2025-08-14 10:25:12.118	science-of-sleep	Dr. Clara Wilson
12	Urban Gardening for Beginners	Grow your own plants and vegetables in limited spaces.	You don’t need a big backyard to grow fresh produce...	https://images.unsplash.com/photo-1498654896293-37aacf113fd9	{https://images.unsplash.com/photo-1498654896293-37aacf113fd9,https://images.unsplash.com/photo-1441974231531-c6227db76b6e}	{gardening,urban,plants}	{lifestyle,environment}	t	2025-08-14 10:25:27.935	2025-08-14 10:25:27.935	urban-gardening-beginners	Oliver Green
13	Top 10 Programming Languages in 2025	A look at the most popular programming languages this year.	The tech industry moves fast, and programming trends evolve with it...	https://images.unsplash.com/photo-1555066931-4365d14bab8c	{https://images.unsplash.com/photo-1555066931-4365d14bab8c,https://images.unsplash.com/photo-1518770660439-4636190af475}	{programming,technology,coding}	{technology,education}	f	2025-08-14 10:25:46.156	2025-08-14 10:25:46.156	top-programming-languages-2025	Nina Park
14	The History of Jazz Music	Exploring the roots and evolution of jazz.	Jazz has a rich cultural history, originating from African American communities...	https://images.unsplash.com/photo-1497032628192-86f99bcd76bc	{https://images.unsplash.com/photo-1497032628192-86f99bcd76bc,https://images.unsplash.com/photo-1525201548940-b1e04c3b60bc}	{music,jazz,history}	{culture,music}	t	2025-08-14 10:26:22.86	2025-08-14 10:26:22.86	history-of-jazz	Marcus Hall
15	DIY Home Office Setup on a Budget	Create a functional and stylish workspace without overspending.	Working from home can be productive with the right setup...	https://images.unsplash.com/photo-1587613865766-b33bfdd4f661	{https://images.unsplash.com/photo-1587613865766-b33bfdd4f661,https://images.unsplash.com/photo-1587614203976-365c74645e83}	{home,diy,work}	{lifestyle,productivity}	t	2025-08-14 10:26:38.657	2025-08-14 10:26:38.657	diy-home-office-budget	Sophia Turner
16	Mediterranean Diet: A Complete Guide	Benefits, recipes, and tips for following the Mediterranean diet.	The Mediterranean diet is praised for its health benefits and delicious flavors...	https://images.unsplash.com/photo-1504674900247-0877df9cc836	{https://images.unsplash.com/photo-1504674900247-0877df9cc836,https://images.unsplash.com/photo-1512058564366-c9b0a8e2f05b}	{diet,health,mediterranean}	{food,health}	t	2025-08-14 10:27:00.592	2025-08-14 10:27:00.592	mediterranean-diet-guide	Elena Martinez
17	AI in Healthcare: Opportunities and Challenges	How artificial intelligence is transforming healthcare.	AI is being applied in diagnostics, treatment planning, and patient care...	https://images.unsplash.com/photo-1581091215361-9a1c5e109f35	{https://images.unsplash.com/photo-1581091215361-9a1c5e109f35,https://images.unsplash.com/photo-1581091215360-6d1a9e1f25a6}	{ai,healthcare,technology}	{technology,health}	t	2025-08-14 10:27:32.426	2025-08-14 10:27:32.426	ai-healthcare-opportunities	Robert King
18	Backpacking Through South America	Tips and stories from an adventurous journey.	Backpacking allows you to immerse yourself in local culture...	https://images.unsplash.com/photo-1507525428034-b723cf961d3e	{https://images.unsplash.com/photo-1507525428034-b723cf961d3e,https://images.unsplash.com/photo-1507525438044-b723cf961d3f}	{travel,backpacking,adventure}	{travel,lifestyle}	t	2025-08-14 10:27:53.813	2025-08-14 10:27:53.813	backpacking-south-america	Lucas Rivera
20	Creative Writing Prompts for Writers	Inspiration and prompts to boost your writing skills.	Sometimes writers face a block. These prompts help spark creativity...	https://images.unsplash.com/photo-1498050108023-c5249f4df085	{https://images.unsplash.com/photo-1498050108023-c5249f4df085,https://images.unsplash.com/photo-1498050108023-c5249f4df086}	{writing,creativity,education}	{writing,lifestyle}	t	2025-08-14 10:28:45.925	2025-08-22 10:16:35.279	creative-writing-prompts	Maya Patel
19	Understanding Cryptocurrency for Beginners	A simple introduction to blockchain and cryptocurrency.	Cryptocurrency can be confusing at first. This guide explains it in simple terms...	https://images.unsplash.com/photo-1499750310107-5fef28a66643	{https://images.unsplash.com/photo-1611078489659-1e3b6d33c6d1,https://images.unsplash.com/photo-1611078489659-1e3b6d33c6d2}	{crypto,blockchain,finance}	{finance,technology}	t	2025-08-14 10:28:12.913	2025-08-14 10:28:12.913	cryptocurrency-beginners	Amira Hassan
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Category" (id, category_name, "createdAt", "updatedAt") FROM stdin;
1	travel	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
2	adventure	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
3	lifestyle	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
4	food	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
5	hobby	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
6	education	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
7	fitness	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
8	health	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
9	technology	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
10	automotive	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
11	business	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
12	finance	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
13	culture	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
14	environment	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
15	music	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
16	productivity	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
17	art	2025-08-28 09:36:18.176	2025-08-28 09:36:18.176
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Contact" (id, first_name, last_name, phone, email, message, "createdAt", "updatedAt") FROM stdin;
1	retew	tewtewtew	5433463	tgdrtre@gkhj.vom	fsfsesrfew	2025-08-18 13:29:59.836	2025-08-18 13:29:59.836
2	fsfdsf	fdfdsf	fbdfgdfg	fsfdsf@gdrg.com	fdsfsfs	2025-08-18 13:30:49.361	2025-08-18 13:30:49.361
\.


--
-- Data for Name: FAQ; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."FAQ" (id, question, answer, "createdAt", "updatedAt", status) FROM stdin;
16	Will AI help me make better decisions?	Yes, AI can provide actionable insights and predictions that improve decision-making processes.	2025-08-26 08:08:38.199	2025-08-26 10:04:57.433	t
15	What is the typical cost of an AI project?	Costs vary based on scope and complexity; we provide detailed proposals after understanding your requirements.	2025-08-26 08:08:22.911	2025-08-26 10:05:37.32	t
12	What if my data is unstructured or messy?	We handle data cleaning and preprocessing to prepare unstructured or incomplete data for effective AI modeling.	2025-08-26 08:07:26.307	2025-08-26 10:24:09.854	t
11	How do you measure the success of an AI project?	Success is measured by predefined KPIs such as accuracy, efficiency improvements, cost savings, and business impact.	2025-08-26 08:07:11.264	2025-08-26 10:24:10.387	t
18	Can you assist with AI strategy consulting?	Yes, we help you identify high-impact AI opportunities and develop a clear roadmap aligned with your business objectives.	2025-08-26 08:09:14.174	2025-08-26 10:16:18.58	t
17	How do you ensure AI ethics and fairness?	We implement best practices to avoid bias, ensure transparency, and maintain ethical standards in all AI solutions.	2025-08-26 08:08:54.924	2025-08-26 10:27:05.808	t
14	Can AI solutions be customized for my unique business needs?	Absolutely, all our AI models and solutions are tailored specifically to your goals and challenges.	2025-08-26 08:08:08.012	2025-08-26 10:16:36.947	t
13	Do you provide post-deployment support?	Yes, we offer ongoing monitoring, maintenance, and updates to ensure your AI solutions continue to perform well.	2025-08-26 08:07:51.136	2025-08-26 10:16:37.566	t
19	Do you offer training for my team on using AI solutions?	Yes, we provide comprehensive training and documentation to help your team get the most out of the AI tools.	2025-08-26 08:09:34.915	2025-08-26 10:24:08.023	t
10	Can you help improve my existing AI models?	Yes, we offer optimization and support services to enhance the performance and scalability of your current AI solutions.	2025-08-26 08:06:25.051	2025-08-26 10:24:12.402	t
9	Do I need to have technical expertise to work with you?	No technical background is required. We guide you through every step and deliver user-friendly AI solutions.	2025-08-26 08:06:07.17	2025-08-26 10:24:14.734	t
8	What kind of AI technologies do you use?	We leverage machine learning, natural language processing, computer vision, and other advanced AI technologies tailored to your needs.	2025-08-26 08:05:50.225	2025-08-26 10:24:16.334	t
7	Will AI replace my employees?	AI is designed to augment human capabilities, automate repetitive tasks, and enable your team to focus on higher-value activities.	2025-08-26 08:05:33.28	2025-08-26 10:24:17.895	t
6	What industries do you specialize in?	We have experience across various industries including healthcare, finance, retail, manufacturing, and more.	2025-08-26 08:05:07.514	2025-08-26 10:24:19.476	t
5	Is my data secure when working with your agency?	Absolutely. We follow strict data security protocols to ensure your data remains confidential and protected at all times.	2025-08-26 08:04:48.688	2025-08-26 10:24:21.167	t
4	Can AI solutions integrate with my existing systems?	Yes, we design AI solutions to seamlessly integrate with your current software, databases, and workflows.	2025-08-26 08:04:30.56	2025-08-26 10:24:22.911	t
3	How long does it take to develop an AI solution?	Development timelines vary based on project complexity but typically range from a few weeks for smaller projects to several months for full-scale implementations.	2025-08-26 08:04:12.379	2025-08-26 10:24:24.565	t
2	Do I need a large amount of data to use AI?	Not necessarily. While more data can improve AI performance, we also work with small or medium datasets by using techniques like transfer learning or synthetic data.	2025-08-26 08:03:52.519	2025-08-26 10:24:25.935	t
20	What types of businesses benefit most from AI ?	Businesses of all sizes and industries can benefit, especially those looking to automate processes, gain insights, or enhance customer experiences.	2025-08-26 08:09:53.318	2025-08-26 11:26:01.408	t
1	What services does your AI agency offer?	We provide end-to-end AI solutions including strategy, data assessment, custom AI development, and ongoing optimization and support.	2025-08-26 08:02:39.946	2025-08-29 12:55:21.411	t
\.


--
-- Data for Name: SEO; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."SEO" (id, route, title, description, keywords, "createdAt", "updatedAt") FROM stdin;
1	/	Webtunix AI | Transforming Businesses with Intelligent AI Solutions	Discover cutting-edge AI technology and solutions designed to transform businesses. WEBTUNIX AI delivers intelligent automation, predictive analytics, and advanced machine learning tools to drive innovation and efficiency.	AI solutions, artificial intelligence, machine learning, predictive analytics, intelligent automation, AI technology, business innovation, AI software, AI services	2025-08-19 11:56:55.127	2025-08-19 11:56:55.127
2	/blogs	Webtunix AI Blog | Latest Insights in Artificial Intelligence	Stay updated with the latest trends, tutorials, and insights in AI and machine learning. Webtunix AI Blog covers intelligent automation, predictive analytics, and innovative AI solutions for businesses and developers.	AI blog, artificial intelligence, machine learning, AI tutorials, AI insights, predictive analytics, intelligent automation, Webtunix AI, AI solutions, tech blog	2025-08-19 12:18:16.748	2025-08-19 12:18:16.748
3	/contact-us	Contact Webtunix AI | Get in Touch with Our AI Experts	Reach out to Webtunix AI for inquiries, support, or partnership opportunities. Our team of AI experts is ready to help you leverage intelligent automation, machine learning, and advanced AI solutions for your business.	contact Webtunix AI, AI support, AI partnership, get in touch, AI experts, artificial intelligence services, machine learning consultation, Webtunix AI contact	2025-08-19 12:24:52.993	2025-08-19 12:24:52.993
\.


--
-- Data for Name: Skills; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Skills" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Agile	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
2	AWS	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
3	Adobe XD	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
4	Cloud Security	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
5	CRM	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
6	Cypress	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
7	Data Analysis	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
8	Deep Learning	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
9	Express	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
10	Figma	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
11	Flutter	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
12	Git	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
13	Illustrator	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
14	InDesign	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
15	Interviewing	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
16	Java	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
17	JavaScript	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
18	Jenkins	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
19	Kubernetes	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
20	Machine Learning	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
21	Markdown	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
22	MongoDB	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
23	Network Security	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
24	Next.js	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
25	Node.js	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
26	Pandas	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
27	Photoshop	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
28	Process Modeling	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
29	Project Management	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
30	Python	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
31	React	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
32	React Native	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
33	Report Writing	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
34	Research	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
35	Requirements Gathering	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
36	Scrum	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
37	Selenium	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
38	SIEM	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
39	SQL	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
40	Sales	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
41	Talent Acquisition	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
42	Test Automation	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
43	Wireframing	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
44	Windows Server	2025-08-28 09:29:56.404	2025-08-28 09:29:56.404
\.


--
-- Data for Name: Vacancies; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Vacancies" (id, "JobTitle", "Job_Description", "Min_exp", "Max_exp", "Job_type", "Salary", "Primary_Skills", "Secondary_Skills", "Show", "createdAt", "updatedAt") FROM stdin;
3	Frontend Developer	Develop and maintain web applications using React and Next.js.	2	5	FULL_TIME	60000-80000	{React,JavaScript,Next.js}	{CSS,HTML,Redux}	t	2025-08-28 07:50:40.105	2025-08-28 07:50:40.105
4	Backend Developer	Build and optimize backend services using Node.js and Express.	3	6	FULL_TIME	70000-90000	{Node.js,Express,MongoDB}	{Docker,Redis}	t	2025-08-28 07:50:45.691	2025-08-28 07:50:45.691
5	UI/UX Designer	Design user-friendly interfaces and improve user experience.	1	4	CONTRACT	40000-60000	{Figma,"Adobe XD",Wireframing}	{Illustrator,Photoshop}	t	2025-08-28 07:50:51.182	2025-08-28 07:50:51.182
6	DevOps Engineer	Automate deployments and manage CI/CD pipelines.	4	8	FULL_TIME	90000-120000	{AWS,Jenkins,Kubernetes}	{Terraform,Docker}	t	2025-08-28 07:50:58.065	2025-08-28 07:50:58.065
7	Data Scientist	Analyze data and build machine learning models.	2	5	FULL_TIME	85000-110000	{Python,"Machine Learning",Pandas}	{TensorFlow,SQL}	t	2025-08-28 07:51:16.001	2025-08-28 07:51:16.001
8	Mobile App Developer	Develop mobile apps for Android and iOS platforms.	2	6	FREELANCE	75000-95000	{"React Native",Flutter,Java}	{Kotlin,Swift}	t	2025-08-28 07:51:26.83	2025-08-28 07:51:26.83
9	Cloud Architect	Design scalable cloud infrastructure solutions.	5	10	FULL_TIME	120000-150000	{Azure,AWS,"Cloud Security"}	{GCP,Networking}	t	2025-08-28 07:51:31.927	2025-08-28 07:51:31.927
10	QA Engineer	Perform manual and automated testing for applications.	1	4	PART_TIME	50000-70000	{Selenium,Cypress,"Test Automation"}	{Jira,Postman}	t	2025-08-28 07:51:37.02	2025-08-28 07:51:37.02
11	Project Manager	Lead project teams and manage timelines.	4	8	FULL_TIME	90000-110000	{Agile,Scrum,"Project Management"}	{Jira,Confluence}	t	2025-08-28 07:51:41.627	2025-08-28 07:51:41.627
12	Cybersecurity Analyst	Monitor and secure IT infrastructure from cyber threats.	3	7	INTERNSHIP	85000-105000	{"Network Security",SIEM,"Incident Response"}	{Linux,Python}	t	2025-08-28 07:51:49.696	2025-08-28 07:51:49.696
13	Business Analyst	Gather requirements, analyze business processes, and document system workflows.	2	5	FULL_TIME	65000-85000	{"Requirements Gathering","Process Modeling",SQL}	{Agile,Jira}	t	2025-08-28 07:52:09.028	2025-08-28 07:52:09.028
14	Graphic Designer	Create engaging designs for digital and print media.	1	3	PART_TIME	30000-50000	{Photoshop,Illustrator,InDesign}	{"After Effects",Canva}	t	2025-08-28 07:52:14.377	2025-08-28 07:52:14.377
15	System Administrator	Maintain servers, networks, and IT infrastructure.	3	6	FULL_TIME	70000-95000	{Linux,"Windows Server",Networking}	{PowerShell,VMware}	t	2025-08-28 07:52:20.224	2025-08-28 07:52:20.224
16	Technical Writer	Write user manuals, API documentation, and technical guides.	2	5	CONTRACT	40000-60000	{Documentation,Markdown,"API Docs"}	{Git,Confluence}	t	2025-08-28 07:52:32.875	2025-08-28 07:52:32.875
17	AI Engineer	Develop AI models for NLP, computer vision, and automation tasks.	3	7	FULL_TIME	100000-140000	{Python,"Deep Learning",PyTorch}	{TensorFlow,OpenCV}	t	2025-08-28 07:52:38.73	2025-08-28 07:52:38.73
18	HR Recruiter	Manage recruitment process, conduct interviews, and onboard new employees.	1	4	FULL_TIME	45000-65000	{Recruitment,Interviewing,"Talent Acquisition"}	{HRMS,Communication}	t	2025-08-28 07:53:05.035	2025-08-28 07:53:05.035
19	Sales Executive	Drive sales, manage client relationships, and meet targets.	1	3	FULL_TIME	35000-55000	{Sales,Negotiation,CRM}	{Communication,"Lead Generation"}	t	2025-08-28 07:53:53.251	2025-08-28 07:53:53.251
20	Research Intern	Assist in research projects, data collection, and report writing.	0	1	INTERNSHIP	10000-15000	{Research,"Data Analysis","Report Writing"}	{Excel,Presentation}	t	2025-08-28 07:54:20.125	2025-08-28 07:54:20.125
21	Full Stack Developer	Work on both frontend and backend development of web applications.	3	7	FULL_TIME	80000-110000	{JavaScript,React,Node.js}	{GraphQL,Docker}	t	2025-08-28 07:54:32.112	2025-08-28 07:54:32.112
1	dadasd	Hello	2	4	FREELANCE	300000	{fdsfds,fdsfdsf,fdsfdsf}	{rewrew,rewrrtfh,ghhgh}	f	2025-08-27 12:26:37.383	2025-09-01 08:36:29.086
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a6342a09-092c-4a44-8893-01a02aaf718b	bf14bde380b84b05f29b628683d4d1304b35048fbab0598bc361af3d7aa96c5e	2025-09-02 11:55:06.654629+00	20250902172403_baseline		\N	2025-09-02 11:55:06.654629+00	0
\.


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 1, true);


--
-- Name: Applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Applications_id_seq"', 1, true);


--
-- Name: Blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Blogs_id_seq"', 20, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Category_id_seq"', 17, true);


--
-- Name: Contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Contact_id_seq"', 2, true);


--
-- Name: FAQ_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."FAQ_id_seq"', 20, true);


--
-- Name: SEO_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."SEO_id_seq"', 3, true);


--
-- Name: Skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Skills_id_seq"', 44, true);


--
-- Name: Vacancies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Vacancies_id_seq"', 21, true);


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

