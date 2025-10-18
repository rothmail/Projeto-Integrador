-- ============================================
-- FAMÍLIA CONECTADA - SCHEMA MySQL
-- Para uso no MySQL Workbench
-- ============================================

-- Criar banco de dados
DROP DATABASE IF EXISTS familia_conectada;
CREATE DATABASE familia_conectada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE familia_conectada;

-- ============================================
-- TABELA: users (Usuários)
-- ============================================
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('mae', 'pai', 'responsavel', 'cuidador', 'outro') NOT NULL,
    avatar VARCHAR(10),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: children_ages (Idades dos Filhos)
-- ============================================
CREATE TABLE children_ages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    age_range ENUM('0-2', '3-5', '6-12', '13+') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: posts (Publicações)
-- ============================================
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    tag ENUM('geral', 'dica', 'desabafo', 'conquista', 'duvida', 'ajuda') DEFAULT 'geral',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_tag (tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: likes (Curtidas)
-- ============================================
CREATE TABLE likes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, post_id),
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: comments (Comentários)
-- ============================================
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: conversations (Conversas)
-- ============================================
CREATE TABLE conversations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    participant1_id BIGINT NOT NULL,
    participant2_id BIGINT NOT NULL,
    last_message_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (participant2_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_participants (participant1_id, participant2_id),
    INDEX idx_last_message (last_message_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: messages (Mensagens)
-- ============================================
CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: forums (Fóruns Temáticos)
-- ============================================
CREATE TABLE forums (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('primeira-infancia', 'pre-escola', 'adolescencia', 'necessidades-especiais') NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    members_count INT DEFAULT 0,
    posts_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: forum_posts (Publicações do Fórum)
-- ============================================
CREATE TABLE forum_posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    forum_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    replies_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_forum_id (forum_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: forum_replies (Respostas do Fórum)
-- ============================================
CREATE TABLE forum_replies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    forum_post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_forum_post_id (forum_post_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: events (Eventos)
-- ============================================
CREATE TABLE events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type ENUM('workshop', 'palestra', 'encontro', 'webinar', 'grupo') NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255),
    is_online BOOLEAN DEFAULT FALSE,
    max_participants INT,
    current_participants INT DEFAULT 0,
    image_url VARCHAR(500),
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_date (date),
    INDEX idx_type (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: event_participants (Participantes)
-- ============================================
CREATE TABLE event_participants (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rsvp_status ENUM('going', 'maybe', 'not_going') DEFAULT 'going',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_participant (event_id, user_id),
    INDEX idx_event_id (event_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: resources (Recursos Educativos)
-- ============================================
CREATE TABLE resources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    category ENUM('artigo', 'guia', 'video', 'podcast', 'livro', 'ferramenta') NOT NULL,
    age_range ENUM('0-2', '3-5', '6-12', '13+', 'todos'),
    author VARCHAR(255),
    url VARCHAR(500),
    image_url VARCHAR(500),
    reading_time INT, -- em minutos
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    bookmarks_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_age_range (age_range)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: resource_bookmarks (Favoritos)
-- ============================================
CREATE TABLE resource_bookmarks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    resource_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, resource_id),
    INDEX idx_user_id (user_id),
    INDEX idx_resource_id (resource_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: notifications (Notificações)
-- ============================================
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type ENUM('like', 'comment', 'message', 'event', 'mention', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    reference_id BIGINT, -- ID do post, evento, etc
    reference_type VARCHAR(50), -- 'post', 'event', 'message', etc
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: sessions (Sessões de Usuário)
-- ============================================
CREATE TABLE sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TRIGGERS
-- ============================================

-- Atualizar contador de likes ao adicionar
DELIMITER //
CREATE TRIGGER increment_likes_count
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
END//
DELIMITER ;

-- Atualizar contador de likes ao remover
DELIMITER //
CREATE TRIGGER decrement_likes_count
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
END//
DELIMITER ;

-- Atualizar contador de comentários ao adicionar
DELIMITER //
CREATE TRIGGER increment_comments_count
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
END//
DELIMITER ;

-- Atualizar contador de comentários ao remover
DELIMITER //
CREATE TRIGGER decrement_comments_count
AFTER DELETE ON comments
FOR EACH ROW
BEGIN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
END//
DELIMITER ;

-- Atualizar última mensagem da conversa
DELIMITER //
CREATE TRIGGER update_conversation_last_message
AFTER INSERT ON messages
FOR EACH ROW
BEGIN
    UPDATE conversations 
    SET last_message_at = NEW.created_at 
    WHERE id = NEW.conversation_id;
END//
DELIMITER ;

-- Atualizar contador de participantes do evento
DELIMITER //
CREATE TRIGGER increment_event_participants
AFTER INSERT ON event_participants
FOR EACH ROW
BEGIN
    UPDATE events SET current_participants = current_participants + 1 WHERE id = NEW.event_id;
END//
DELIMITER ;

-- Decrementar contador de participantes do evento
DELIMITER //
CREATE TRIGGER decrement_event_participants
AFTER DELETE ON event_participants
FOR EACH ROW
BEGIN
    UPDATE events SET current_participants = current_participants - 1 WHERE id = OLD.event_id;
END//
DELIMITER ;

-- ============================================
-- VIEWS
-- ============================================

-- View: Posts com informações do usuário
CREATE VIEW v_posts_with_user AS
SELECT 
    p.*,
    u.name as user_name,
    u.avatar as user_avatar,
    u.role as user_role
FROM posts p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;

-- View: Estatísticas da comunidade
CREATE VIEW v_community_stats AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as total_users,
    (SELECT COUNT(*) FROM posts) as total_posts,
    (SELECT COUNT(*) FROM events WHERE date >= CURDATE()) as upcoming_events,
    (SELECT COUNT(*) FROM resources) as total_resources;

-- View: Conversas com última mensagem
CREATE VIEW v_conversations_with_last_message AS
SELECT 
    c.*,
    u1.name as participant1_name,
    u1.avatar as participant1_avatar,
    u2.name as participant2_name,
    u2.avatar as participant2_avatar,
    (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_content,
    (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id AND is_read = FALSE) as unread_count
FROM conversations c
INNER JOIN users u1 ON c.participant1_id = u1.id
INNER JOIN users u2 ON c.participant2_id = u2.id;

-- ============================================
-- FIM DO SCHEMA
-- ============================================

-- Mensagem de sucesso
SELECT 'Schema criado com sucesso!' as message;
SELECT 'Execute seeds.sql para popular o banco com dados de exemplo' as next_step;
