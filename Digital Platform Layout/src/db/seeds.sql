-- ============================================
-- FAMÍLIA CONECTADA - DADOS INICIAIS (SEEDS)
-- Para uso no MySQL Workbench após criar o schema
-- ============================================

USE familia_conectada;

-- ============================================
-- LIMPAR DADOS EXISTENTES (CUIDADO!)
-- ============================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE resource_bookmarks;
TRUNCATE TABLE notifications;
TRUNCATE TABLE sessions;
TRUNCATE TABLE forum_replies;
TRUNCATE TABLE forum_posts;
TRUNCATE TABLE forums;
TRUNCATE TABLE event_participants;
TRUNCATE TABLE events;
TRUNCATE TABLE messages;
TRUNCATE TABLE conversations;
TRUNCATE TABLE comments;
TRUNCATE TABLE likes;
TRUNCATE TABLE posts;
TRUNCATE TABLE children_ages;
TRUNCATE TABLE resources;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- USUÁRIOS
-- ============================================
-- Senha padrão para todos: "123456" (hash simplificado: "jlk")
INSERT INTO users (name, email, password_hash, role, avatar, bio, last_login) VALUES
('Maria Silva', 'maria@email.com', 'jlk', 'mae', 'MS', 'Mãe de dois filhos maravilhosos, sempre buscando aprender e compartilhar experiências.', NOW()),
('João Santos', 'joao@email.com', 'jlk', 'pai', 'JS', 'Pai de primeira viagem aprendendo a cada dia. Adoro compartilhar dicas!', NOW()),
('Ana Paula', 'ana@email.com', 'jlk', 'mae', 'AP', 'Mãe solo de 3. Aqui para apoiar e ser apoiada.', NOW()),
('Carlos Eduardo', 'carlos@email.com', 'jlk', 'pai', 'CE', 'Pai de gêmeas. Sempre em busca de novos recursos educativos.', NOW()),
('Juliana Costa', 'juliana@email.com', 'jlk', 'responsavel', 'JC', 'Avó cuidadora. Experiência de sobra para compartilhar!', NOW()),
('Pedro Alves', 'pedro@email.com', 'jlk', 'pai', 'PA', 'Pai de adolescente. Navegando os desafios com amor e paciência.', NOW()),
('Fernanda Lima', 'fernanda@email.com', 'jlk', 'mae', 'FL', 'Mãe atípica. Compartilhando a jornada com necessidades especiais.', NOW()),
('Roberto Mendes', 'roberto@email.com', 'jlk', 'cuidador', 'RM', 'Educador e cuidador profissional. Aqui para ajudar!', NOW());

-- ============================================
-- IDADES DOS FILHOS
-- ============================================
INSERT INTO children_ages (user_id, age_range) VALUES
(1, '0-2'), (1, '3-5'),  -- Maria: 2 filhos
(2, '0-2'),              -- João: bebê
(3, '3-5'), (3, '6-12'), (3, '13+'), -- Ana: 3 filhos
(4, '0-2'),              -- Carlos: gêmeas
(5, '6-12'),             -- Juliana: neto
(6, '13+'),              -- Pedro: adolescente
(7, '6-12'),             -- Fernanda: criança especial
(8, '0-2'), (8, '3-5');  -- Roberto: cuidador

-- ============================================
-- FÓRUNS
-- ============================================
INSERT INTO forums (name, type, description, icon, members_count, posts_count) VALUES
('Primeira Infância', 'primeira-infancia', 'Para pais de bebês e crianças de 0 a 3 anos', '👶', 450, 1234),
('Pré-escola', 'pre-escola', 'Compartilhe experiências com crianças de 4 a 6 anos', '🎨', 320, 890),
('Adolescência', 'adolescencia', 'Navegando os desafios da adolescência juntos', '🎓', 210, 567),
('Necessidades Especiais', 'necessidades-especiais', 'Apoio e recursos para famílias atípicas', '💙', 180, 423);

-- ============================================
-- POSTS
-- ============================================
INSERT INTO posts (user_id, content, tag, likes_count, comments_count, created_at) VALUES
(1, 'Meu filho acabou de dar os primeiros passos! Estou tão emocionada! 🥰👣', 'conquista', 45, 12, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 'Alguém tem dicas de como fazer o bebê dormir a noite toda? Estamos exaustos... 😴', 'duvida', 28, 15, DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 'Preciso desabafar... Ser mãe solo é muito difícil às vezes. Mas vamos seguindo! 💪', 'desabafo', 67, 23, DATE_SUB(NOW(), INTERVAL 8 HOUR)),
(4, 'Descobri um aplicativo incrível para ensinar matemática brincando! As gêmeas amaram!', 'dica', 34, 8, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(5, 'Receita de papinha nutritiva que meu neto adora: abóbora + frango + batata doce 🍲', 'dica', 89, 19, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6, 'Minha filha passou no vestibular! Depois de tanto estudo, ela conseguiu! 🎓🎉', 'conquista', 134, 45, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(7, 'Hoje tivemos uma consulta muito positiva. Cada pequeno progresso é uma vitória! 💙', 'conquista', 78, 21, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(8, 'Lembrete: paciência e amor são as melhores ferramentas na educação infantil. ❤️', 'geral', 56, 10, DATE_SUB(NOW(), INTERVAL 4 DAY));

-- ============================================
-- LIKES
-- ============================================
INSERT INTO likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 1), (5, 1), (6, 1),  -- Post 1: 5 likes
(1, 2), (3, 2), (5, 2), (7, 2),          -- Post 2: 4 likes
(1, 3), (2, 3), (4, 3), (6, 3), (8, 3),  -- Post 3: 5 likes
(1, 6), (2, 6), (3, 6), (5, 6), (7, 6), (8, 6); -- Post 6: 6 likes

-- ============================================
-- COMENTÁRIOS
-- ============================================
INSERT INTO comments (post_id, user_id, content, created_at) VALUES
(1, 2, 'Parabéns! É um momento tão especial! 🥰', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, 5, 'Que lindo! Aproveite cada fase!', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 1, 'Já tentou estabelecer uma rotina de sono? Funcionou comigo!', DATE_SUB(NOW(), INTERVAL 4 HOUR)),
(2, 5, 'Banho morno e música suave antes de dormir ajudam muito.', DATE_SUB(NOW(), INTERVAL 4 HOUR)),
(2, 7, 'Paciência, cada bebê tem seu tempo. Você vai conseguir!', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(3, 1, 'Você é incrível! Força, guerreira! 💪', DATE_SUB(NOW(), INTERVAL 7 HOUR)),
(3, 4, 'Estamos aqui para apoiar! Você não está sozinha.', DATE_SUB(NOW(), INTERVAL 7 HOUR)),
(6, 3, 'QUE MARAVILHA! Parabéns para ela!!! 🎉', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6, 8, 'Resultado do esforço e dedicação! Parabéns!', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ============================================
-- CONVERSAS
-- ============================================
INSERT INTO conversations (participant1_id, participant2_id, last_message_at) VALUES
(1, 2, DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(1, 3, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 4, DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 5, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ============================================
-- MENSAGENS
-- ============================================
INSERT INTO messages (conversation_id, sender_id, content, is_read, created_at) VALUES
-- Conversa 1 (Maria e João)
(1, 1, 'Oi João! Vi seu post sobre sono do bebê. Tenho algumas dicas!', TRUE, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, 2, 'Oi Maria! Qualquer ajuda é muito bem-vinda! 😊', TRUE, DATE_SUB(NOW(), INTERVAL 50 MINUTE)),
(1, 1, 'Primeiro, estabeleça uma rotina...', FALSE, DATE_SUB(NOW(), INTERVAL 30 MINUTE)),

-- Conversa 2 (Maria e Ana)
(2, 3, 'Maria, obrigada pelo apoio! Significa muito! 💙', TRUE, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 1, 'Imagina! Estamos juntas nessa! ❤️', TRUE, DATE_SUB(NOW(), INTERVAL 2 HOUR)),

-- Conversa 3 (João e Carlos)
(3, 2, 'Carlos, qual o nome daquele app de matemática?', TRUE, DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 4, 'É o "Math Kids"! Muito bom mesmo!', FALSE, DATE_SUB(NOW(), INTERVAL 5 HOUR));

-- ============================================
-- EVENTOS
-- ============================================
INSERT INTO events (title, description, event_type, date, time, location, is_online, max_participants, current_participants, created_by) VALUES
('Workshop: Primeiros Socorros Infantis', 'Aprenda técnicas essenciais de primeiros socorros para crianças', 'workshop', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '14:00:00', 'Centro Comunitário', FALSE, 30, 0, 8),
('Palestra: Comunicação Não-Violenta', 'Como se comunicar melhor com seus filhos', 'palestra', DATE_ADD(CURDATE(), INTERVAL 10 DAY), '19:00:00', 'Online - Zoom', TRUE, 100, 0, 5),
('Encontro de Mães: Café e Conversa', 'Momento de relaxamento e troca de experiências', 'encontro', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '10:00:00', 'Café Aconchego', FALSE, 15, 0, 1),
('Webinar: Desenvolvimento Infantil 0-3 anos', 'Entenda as fases do desenvolvimento do seu bebê', 'webinar', DATE_ADD(CURDATE(), INTERVAL 14 DAY), '20:00:00', 'Online - YouTube', TRUE, 500, 0, 8),
('Grupo de Apoio: Famílias Atípicas', 'Encontro mensal de apoio e acolhimento', 'grupo', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '15:00:00', 'Associação Vida', FALSE, 20, 0, 7);

-- ============================================
-- RECURSOS EDUCATIVOS
-- ============================================
INSERT INTO resources (title, description, category, age_range, author, reading_time, is_featured, views_count) VALUES
('Guia Completo: Introdução Alimentar', 'Tudo sobre como iniciar a alimentação do bebê com segurança', 'guia', '0-2', 'Dra. Ana Pediatra', 15, TRUE, 2345),
('10 Brincadeiras para Desenvolvimento Motor', 'Atividades lúdicas que estimulam o desenvolvimento', 'artigo', '3-5', 'Prof. Carlos Silva', 8, TRUE, 1890),
('Como Falar sobre Emoções com Crianças', 'Dicas práticas de inteligência emocional infantil', 'artigo', '6-12', 'Psicóloga Maria Santos', 10, FALSE, 1234),
('Podcast: Adolescência sem Drama', 'Série sobre os desafios da adolescência', 'podcast', '13+', 'João Pais', 30, TRUE, 3456),
('Checklist: Primeiros Socorros', 'O que ter em casa para emergências infantis', 'guia', 'todos', 'Enfermeira Paula', 5, FALSE, 987),
('Vídeo: Rotina de Sono do Bebê', 'Como estabelecer uma boa rotina de sono', 'video', '0-2', 'Consultora do Sono', 12, TRUE, 4567),
('E-book: Disciplina Positiva', 'Educar com amor e limites', 'livro', 'todos', 'Educadora Fernanda', 45, FALSE, 2109),
('App: Marcos do Desenvolvimento', 'Acompanhe o desenvolvimento do seu filho', 'ferramenta', '0-2', 'Tech Parents', 0, TRUE, 5678);

-- ============================================
-- POSTS DO FÓRUM
-- ============================================
INSERT INTO forum_posts (forum_id, user_id, title, content, replies_count, views_count, created_at) VALUES
(1, 1, 'Dúvida sobre amamentação', 'Meu bebê mama de hora em hora à noite. É normal?', 8, 234, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(1, 2, 'Melhores marcas de fralda?', 'Qual vocês recomendam? Custo-benefício?', 15, 456, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 4, 'Atividades para dia chuvoso', 'O que fazer com as crianças em casa?', 12, 189, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(3, 6, 'Adolescente e redes sociais', 'Como controlar sem invadir a privacidade?', 23, 567, DATE_SUB(NOW(), INTERVAL 4 DAY)),
(4, 7, 'Indicação de profissionais', 'Alguém conhece bom terapeuta ocupacional?', 6, 123, DATE_SUB(NOW(), INTERVAL 5 DAY));

-- ============================================
-- RESPOSTAS DO FÓRUM
-- ============================================
INSERT INTO forum_replies (forum_post_id, user_id, content, created_at) VALUES
(1, 5, 'É totalmente normal! Na verdade é até esperado. Paciência!', DATE_SUB(NOW(), INTERVAL 20 HOUR)),
(1, 8, 'Sim, é fase! Com o tempo vai espaçando naturalmente.', DATE_SUB(NOW(), INTERVAL 18 HOUR)),
(2, 1, 'Eu uso a marca X, é ótima e não vaza!', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 3, 'Experimentei várias, a melhor é mesmo a Y!', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 1, 'Estabeleça horários e converse abertamente!', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 3, 'Uso apps de controle parental, ajuda muito!', DATE_SUB(NOW(), INTERVAL 3 DAY));

-- ============================================
-- NOTIFICAÇÕES
-- ============================================
INSERT INTO notifications (user_id, type, title, content, reference_id, reference_type, is_read) VALUES
(1, 'like', 'Nova curtida', 'João curtiu sua publicação', 1, 'post', FALSE),
(1, 'comment', 'Novo comentário', 'Ana comentou: "Parabéns!"', 1, 'post', FALSE),
(2, 'message', 'Nova mensagem', 'Maria enviou uma mensagem', 1, 'conversation', FALSE),
(3, 'event', 'Novo evento', 'Workshop de Primeiros Socorros próximo!', 1, 'event', TRUE),
(6, 'mention', 'Você foi mencionado', 'Carlos mencionou você em um comentário', 4, 'post', FALSE);

-- ============================================
-- ESTATÍSTICAS FINAIS
-- ============================================
SELECT 'Dados inseridos com sucesso!' as status;

SELECT 
    'Usuários' as tabela, 
    COUNT(*) as total 
FROM users

UNION ALL

SELECT 
    'Posts', 
    COUNT(*) 
FROM posts

UNION ALL

SELECT 
    'Comentários', 
    COUNT(*) 
FROM comments

UNION ALL

SELECT 
    'Eventos', 
    COUNT(*) 
FROM events

UNION ALL

SELECT 
    'Recursos', 
    COUNT(*) 
FROM resources

UNION ALL

SELECT 
    'Conversas', 
    COUNT(*) 
FROM conversations

UNION ALL

SELECT 
    'Mensagens', 
    COUNT(*) 
FROM messages;

-- ============================================
-- CREDENCIAIS DE ACESSO
-- ============================================
SELECT 
    '=== CREDENCIAIS PARA TESTE ===' as info
UNION ALL
SELECT 'Email: maria@email.com | Senha: 123456'
UNION ALL
SELECT 'Email: joao@email.com | Senha: 123456'
UNION ALL
SELECT 'Email: ana@email.com | Senha: 123456'
UNION ALL
SELECT 'Todos os usuários têm a mesma senha: 123456';
