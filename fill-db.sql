
      INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
      ('ivanov@example.com', 'Иван', 'Иванов', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar1.jpg'),
('petrov@example.com', 'Пётр', 'Петров', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar2.jpg');
      INSERT INTO categories(category_name) VALUES
      ('Программирование'),
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Железо');
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
      ('Рок — это протест', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?', 'Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.', 'sea', 1),
('Лучшие рок-музыканты 20-века', 'Помните небольшое количество ежедневных упражнений лучше чем один раз но много.', 'Программировать не настолько сложно как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов.', '', 1),
('Лучшие рок-музыканты 20-века', 'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.', 'Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году.', '', 1),
('Борьба с прокрастинацией', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?', 'Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', '', 2),
('Учим HTML и CSS', 'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры.', '', 1);
      ALTER TABLE articles ENABLE TRIGGER ALL;
      ALTER TABLE articles_categories DISABLE TRIGGER ALL;
      INSERT INTO articles_categories(article_id, category_id) VALUES
      (1, 7),
(2, 4),
(3, 2),
(4, 9),
(5, 9);
      ALTER TABLE articles_categories ENABLE TRIGGER ALL;
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO comments(comment_text, user_id, article_id) VALUES
      ('Плюсую, но слишком много буквы! Согласен с автором!', 1, 1),
('Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?', 2, 1),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 2, 1),
('Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!', 2, 2),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!', 2, 3),
('Совсем немного... Мне кажется или я уже читал это где-то?', 2, 3),
('Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 3),
('Планируете записать видосик на эту тему?', 1, 3),
('Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты', 2, 4),
('Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 2, 5);
      ALTER TABLE comments ENABLE TRIGGER ALL;