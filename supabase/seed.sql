-- Seed launch markets (run after migration, adjust category_id from your categories table)

insert into markets (title, title_ka, description, resolution_criteria, category_id, yes_price, no_price, end_date, is_featured, total_volume, liquidity)
select
  'Will Georgia qualify for the 2026 FIFA World Cup?',
  'გამოვა თუ არა საქართველო 2026 FIFA World Cup-ზე?',
  'Georgia must officially qualify through UEFA qualifying rounds.',
  'Official FIFA qualification announcement by December 31, 2025.',
  id, 0.45, 0.55, '2025-12-31', true, 124500, 50000
from categories where slug = 'georgian-sports';

insert into markets (title, title_ka, description, resolution_criteria, category_id, yes_price, no_price, end_date, total_volume, liquidity)
select
  'Will GEL/USD rate stay below 2.80 by end of 2025?',
  'დარჩება თუ არა GEL/USD კურსი 2.80-ზე დაბალი 2025 წლის ბოლომდე?',
  'National Bank of Georgia official daily reference rate.',
  'NBG official rate on December 31, 2025 must be below 2.80.',
  id, 0.60, 0.40, '2025-12-31', 89200, 35000
from categories where slug = 'economy';

insert into markets (title, title_ka, description, resolution_criteria, category_id, yes_price, no_price, end_date, total_volume, liquidity)
select
  'Will Tbilisi Mayor elections happen before October 2025?',
  'ჩატარდება თუ არა თბილისის მერის არჩევნები 2025 ოქტომბრამდე?',
  'Official municipal election date announced by CEC.',
  'Central Election Commission official schedule.',
  id, 0.35, 0.65, '2025-10-01', 67800, 28000
from categories where slug = 'georgian-politics';

insert into markets (title, title_ka, description, resolution_criteria, category_id, yes_price, no_price, end_date, is_featured, total_volume, liquidity)
select
  'Will Georgia sign EU accession agreement by 2026?',
  'ხელმოეწერა თუ არა საქართველო ევროკავშირთან გავლეთის ხელშეკრულებას 2026-მდე?',
  'Formal signing ceremony between EU and Georgian government.',
  'Official EU and Georgian government joint announcement.',
  id, 0.40, 0.60, '2026-06-30', true, 156000, 75000
from categories where slug = 'georgian-politics';

insert into markets (title, title_ka, description, resolution_criteria, category_id, yes_price, no_price, end_date, total_volume, liquidity)
select
  'Will Rustavi 2 remain editorially independent by end of 2025?',
  'დარჩება თუ არა რუსთავი 2 რედაქციულად დამოუკიდებელი 2025 წლის ბოლომდე?',
  'Based on media ownership registry and editorial policy changes.',
  'Media ownership registry + independent journalism watchdog assessment.',
  id, 0.50, 0.50, '2025-12-31', 34500, 15000
from categories where slug = 'culture';
