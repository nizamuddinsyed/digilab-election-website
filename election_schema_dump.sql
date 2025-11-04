--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (6bc9ef8)
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: neon_auth; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA neon_auth;


ALTER SCHEMA neon_auth OWNER TO neondb_owner;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users_sync; Type: TABLE; Schema: neon_auth; Owner: neondb_owner
--

CREATE TABLE neon_auth.users_sync (
    raw_json jsonb NOT NULL,
    id text GENERATED ALWAYS AS ((raw_json ->> 'id'::text)) STORED NOT NULL,
    name text GENERATED ALWAYS AS ((raw_json ->> 'display_name'::text)) STORED,
    email text GENERATED ALWAYS AS ((raw_json ->> 'primary_email'::text)) STORED,
    created_at timestamp with time zone GENERATED ALWAYS AS (to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))) STORED,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE neon_auth.users_sync OWNER TO neondb_owner;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp with time zone
);


ALTER TABLE public.admin_users OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_id_seq OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: basic_topics; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.basic_topics (
    id integer NOT NULL,
    title_de character varying(255) NOT NULL,
    title_en character varying(255) NOT NULL,
    description_de text NOT NULL,
    description_en text NOT NULL,
    color character varying(20) DEFAULT 'purple'::character varying,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT basic_topics_color_check CHECK (((color)::text = ANY ((ARRAY['purple'::character varying, 'silver'::character varying, 'teal'::character varying])::text[])))
);


ALTER TABLE public.basic_topics OWNER TO neondb_owner;

--
-- Name: basic_topics_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.basic_topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.basic_topics_id_seq OWNER TO neondb_owner;

--
-- Name: basic_topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.basic_topics_id_seq OWNED BY public.basic_topics.id;


--
-- Name: candidates; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.candidates (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    bio_de text NOT NULL,
    bio_en text NOT NULL,
    goals_de text NOT NULL,
    goals_en text NOT NULL,
    email character varying(255),
    social_links jsonb DEFAULT '{}'::jsonb,
    photo_url character varying(500),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    color character varying(20) DEFAULT 'purple'::character varying,
    CONSTRAINT candidates_color_check CHECK (((color)::text = ANY ((ARRAY['purple'::character varying, 'silver'::character varying, 'teal'::character varying])::text[])))
);


ALTER TABLE public.candidates OWNER TO neondb_owner;

--
-- Name: candidates_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candidates_id_seq OWNER TO neondb_owner;

--
-- Name: candidates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.candidates_id_seq OWNED BY public.candidates.id;


--
-- Name: endorsements; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.endorsements (
    id integer NOT NULL,
    candidate_id integer,
    organization_name character varying(255) NOT NULL,
    endorsement_date timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.endorsements OWNER TO neondb_owner;

--
-- Name: endorsements_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.endorsements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.endorsements_id_seq OWNER TO neondb_owner;

--
-- Name: endorsements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.endorsements_id_seq OWNED BY public.endorsements.id;


--
-- Name: event_participants; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.event_participants (
    event_id integer NOT NULL,
    candidate_id integer NOT NULL
);


ALTER TABLE public.event_participants OWNER TO neondb_owner;

--
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title_de character varying(255) NOT NULL,
    title_en character varying(255) NOT NULL,
    event_date date NOT NULL,
    event_time time without time zone NOT NULL,
    location_de character varying(255) NOT NULL,
    location_en character varying(255) NOT NULL,
    description_de text NOT NULL,
    description_en text NOT NULL,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO neondb_owner;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO neondb_owner;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question_de character varying(255) NOT NULL,
    question_en character varying(255) NOT NULL,
    answer_de text NOT NULL,
    answer_en text NOT NULL,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.faqs OWNER TO neondb_owner;

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO neondb_owner;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: funding_data; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.funding_data (
    id integer NOT NULL,
    candidate_id integer,
    amount numeric(12,2) NOT NULL,
    source character varying(255),
    funding_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.funding_data OWNER TO neondb_owner;

--
-- Name: funding_data_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.funding_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.funding_data_id_seq OWNER TO neondb_owner;

--
-- Name: funding_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.funding_data_id_seq OWNED BY public.funding_data.id;


--
-- Name: policies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.policies (
    id integer NOT NULL,
    title_de character varying(255) NOT NULL,
    title_en character varying(255) NOT NULL,
    description_de text NOT NULL,
    description_en text NOT NULL,
    color character varying(20) DEFAULT 'purple'::character varying,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT policies_color_check CHECK (((color)::text = ANY ((ARRAY['purple'::character varying, 'silver'::character varying, 'teal'::character varying])::text[])))
);


ALTER TABLE public.policies OWNER TO neondb_owner;

--
-- Name: policies_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.policies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.policies_id_seq OWNER TO neondb_owner;

--
-- Name: policies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.policies_id_seq OWNED BY public.policies.id;


--
-- Name: timeline_events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.timeline_events (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    type character varying(50) NOT NULL,
    title_de character varying(255) NOT NULL,
    title_en character varying(255) NOT NULL,
    description_de text,
    description_en text,
    location character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT timeline_events_type_check CHECK (((type)::text = ANY ((ARRAY['debate'::character varying, 'primary'::character varying, 'endorsement'::character varying, 'announcement'::character varying])::text[])))
);


ALTER TABLE public.timeline_events OWNER TO neondb_owner;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.timeline_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.timeline_events_id_seq OWNER TO neondb_owner;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.timeline_events_id_seq OWNED BY public.timeline_events.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: basic_topics id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.basic_topics ALTER COLUMN id SET DEFAULT nextval('public.basic_topics_id_seq'::regclass);


--
-- Name: candidates id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.candidates ALTER COLUMN id SET DEFAULT nextval('public.candidates_id_seq'::regclass);


--
-- Name: endorsements id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.endorsements ALTER COLUMN id SET DEFAULT nextval('public.endorsements_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: funding_data id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.funding_data ALTER COLUMN id SET DEFAULT nextval('public.funding_data_id_seq'::regclass);


--
-- Name: policies id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.policies ALTER COLUMN id SET DEFAULT nextval('public.policies_id_seq'::regclass);


--
-- Name: timeline_events id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.timeline_events ALTER COLUMN id SET DEFAULT nextval('public.timeline_events_id_seq'::regclass);


--
-- Name: users_sync users_sync_pkey; Type: CONSTRAINT; Schema: neon_auth; Owner: neondb_owner
--

ALTER TABLE ONLY neon_auth.users_sync
    ADD CONSTRAINT users_sync_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_email_key UNIQUE (email);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_key UNIQUE (username);


--
-- Name: basic_topics basic_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.basic_topics
    ADD CONSTRAINT basic_topics_pkey PRIMARY KEY (id);


--
-- Name: candidates candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (id);


--
-- Name: endorsements endorsements_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.endorsements
    ADD CONSTRAINT endorsements_pkey PRIMARY KEY (id);


--
-- Name: event_participants event_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_pkey PRIMARY KEY (event_id, candidate_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: funding_data funding_data_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.funding_data
    ADD CONSTRAINT funding_data_pkey PRIMARY KEY (id);


--
-- Name: policies policies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (id);


--
-- Name: timeline_events timeline_events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.timeline_events
    ADD CONSTRAINT timeline_events_pkey PRIMARY KEY (id);


--
-- Name: users_sync_deleted_at_idx; Type: INDEX; Schema: neon_auth; Owner: neondb_owner
--

CREATE INDEX users_sync_deleted_at_idx ON neon_auth.users_sync USING btree (deleted_at);


--
-- Name: idx_admin_users_username; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_admin_users_username ON public.admin_users USING btree (username);


--
-- Name: idx_basic_topics_display_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_basic_topics_display_order ON public.basic_topics USING btree (display_order);


--
-- Name: idx_basic_topics_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_basic_topics_is_active ON public.basic_topics USING btree (is_active);


--
-- Name: idx_candidates_created_at; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_candidates_created_at ON public.candidates USING btree (created_at DESC);


--
-- Name: idx_candidates_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_candidates_is_active ON public.candidates USING btree (is_active);


--
-- Name: idx_events_display_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_events_display_order ON public.events USING btree (display_order);


--
-- Name: idx_events_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_events_is_active ON public.events USING btree (is_active);


--
-- Name: idx_faqs_display_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_faqs_display_order ON public.faqs USING btree (display_order);


--
-- Name: idx_faqs_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_faqs_is_active ON public.faqs USING btree (is_active);


--
-- Name: idx_policies_display_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_policies_display_order ON public.policies USING btree (display_order);


--
-- Name: idx_policies_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_policies_is_active ON public.policies USING btree (is_active);


--
-- Name: basic_topics update_basic_topics_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_basic_topics_updated_at BEFORE UPDATE ON public.basic_topics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: candidates update_candidates_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: events update_events_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: faqs update_faqs_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: policies update_policies_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON public.policies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: endorsements endorsements_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.endorsements
    ADD CONSTRAINT endorsements_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.timeline_events(id) ON DELETE CASCADE;


--
-- Name: funding_data funding_data_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.funding_data
    ADD CONSTRAINT funding_data_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

