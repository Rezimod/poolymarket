-- Poolymarket initial schema

create table profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  avatar_url text,
  lari_points integer default 1000,
  total_volume integer default 0,
  total_pnl integer default 0,
  rank text default 'Beginner',
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ka text not null,
  slug text unique not null,
  icon text not null,
  color text not null
);

create table markets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_ka text,
  description text not null,
  resolution_criteria text not null,
  category_id uuid references categories(id),
  creator_id uuid references profiles(id),
  status text default 'open',
  outcome text,
  yes_price numeric(5,4) default 0.50,
  no_price numeric(5,4) default 0.50,
  total_volume integer default 0,
  liquidity integer default 0,
  end_date timestamptz not null,
  resolved_at timestamptz,
  resolution_source text,
  image_url text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references markets(id),
  user_id uuid references profiles(id),
  side text not null,
  order_type text not null,
  price numeric(5,4),
  shares integer not null,
  filled_shares integer default 0,
  status text default 'open',
  created_at timestamptz default now()
);

create table trades (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references markets(id),
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  side text not null,
  price numeric(5,4) not null,
  shares integer not null,
  maker_order_id uuid references orders(id),
  taker_order_id uuid references orders(id),
  created_at timestamptz default now()
);

create table positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  market_id uuid references markets(id),
  side text not null,
  shares integer not null,
  avg_price numeric(5,4) not null,
  realized_pnl integer default 0,
  unique(user_id, market_id, side)
);

create table price_history (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references markets(id),
  yes_price numeric(5,4) not null,
  volume integer not null,
  recorded_at timestamptz default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references markets(id),
  user_id uuid references profiles(id),
  content text not null,
  likes integer default 0,
  created_at timestamptz default now()
);

create table market_suggestions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  submitted_by uuid references profiles(id),
  status text default 'pending',
  votes integer default 0,
  created_at timestamptz default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  type text not null,
  title text not null,
  body text not null,
  market_id uuid references markets(id),
  is_read boolean default false,
  created_at timestamptz default now()
);

create table rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  type text not null,
  value text not null,
  reason text not null,
  claimed_at timestamptz,
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table orders enable row level security;
alter table positions enable row level security;
alter table notifications enable row level security;

create policy "Users see own profile" on profiles for select using (auth.uid() = id);
create policy "Public profiles readable" on profiles for select using (true);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Users create own orders" on orders for insert with check (auth.uid() = user_id);
create policy "Users see all orders" on orders for select using (true);
create policy "Users see own positions" on positions for select using (auth.uid() = user_id);
create policy "Markets are public" on markets for select using (true);
create policy "Categories are public" on categories for select using (true);
create policy "Trades are public" on trades for select using (true);
create policy "Comments are public" on comments for select using (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, lari_points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    1000
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed categories
insert into categories (name, name_ka, slug, icon, color) values
  ('Georgian Politics', 'ქართული პოლიტიკა', 'georgian-politics', '🇬🇪', '#DC2626'),
  ('Georgian Sports', 'ქართული სპორტი', 'georgian-sports', '⚽', '#10B981'),
  ('Economy', 'ეკონომიკა', 'economy', '📈', '#F59E0B'),
  ('Culture', 'კულტურა', 'culture', '🎭', '#8B5CF6'),
  ('Global', 'გლობალური', 'global', '🌍', '#3B82F6'),
  ('Weather', 'ამინდი', 'weather', '🌤️', '#06B6D4');
