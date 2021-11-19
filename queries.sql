SELECT *
FROM categories;
SELECT id,
  category_name
FROM categories
  JOIN articles_categories ON id = category_id
GROUP BY id;
SELECT id,
  category_name,
  count(article_id)
FROM categories
  LEFT JOIN articles_categories ON id = category_id
GROUP BY id;
SELECT articles.*,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.category_name, ', ') AS category_list
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
GROUP BY articles.id,
  users.id
ORDER BY articles.created_at DESC;
SELECT articles.*,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.category_name, ', ') AS category_list
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 11
GROUP BY articles.id,
  users.id;
SELECT comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.comment_text
FROM comments
  JOIN users ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;
SELECT comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.comment_text
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.article_id = 11
ORDER BY comments.created_at DESC;
UPDATE articles
SET title = 'Новый заголовок!'
WHERE id = 11;