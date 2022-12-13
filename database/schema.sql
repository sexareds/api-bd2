CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	user_role VARCHAR(255) NOT NULL CHECK(user_role IN ('user', 'administrator')),
	email VARCHAR(255) NOT NULL UNIQUE CHECK(email LIKE '%_@__%.__%'),
	user_password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(user_id)	
);

CREATE TABLE events(
	event_id INT NOT NULL AUTO_INCREMENT,
	event_name VARCHAR(255) NOT NULL,
	img TEXT NOT NULL,
	is_active BOOL NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(event_id)	
);

CREATE TABLE teams(
	team_id INT NOT NULL AUTO_INCREMENT,
	team_name VARCHAR(255) NOT NULL,
	event_id INT NOT NULL,
	badge TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(team_id, event_id),
	FOREIGN KEY(event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE stickers(
	sticker_id INT NOT NULL AUTO_INCREMENT,
	player_id VARCHAR(255) NOT NULL,
	img TEXT NOT NULL,
	height DECIMAL(3, 2) NOT NULL,
	weight DECIMAL(4, 1) NOT NULL,
	event_id INT NOT NULL,
	team_id INT NOT NULL,
	position VARCHAR(255) NOT NULL CHECK(position IN ('goalkeeper', 'defender', 'midfielder', 'forward')),
	appearance_rate FLOAT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(sticker_id),
	FOREIGN KEY(event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE albums(
	sticker_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	PRIMARY KEY(sticker_id, user_id),
	FOREIGN KEY(sticker_id) REFERENCES stickers(sticker_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE inventory(
	sticker_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	acquired_date DATE NOT NULL,
	PRIMARY KEY(sticker_id, user_id, acquired_date),
	FOREIGN KEY(sticker_id) REFERENCES stickers(sticker_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE games(
	game_id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	team_1_id INT NOT NULL,
	team_2_id INT NOT NULL,
	matched_at DATE NOT NULL,
	PRIMARY KEY(game_id),
	FOREIGN KEY(event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(team_1_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(team_2_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE players(
	player_id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	team_id INT NOT NULL,
	PRIMARY KEY(player_id),
	FOREIGN KEY(team_id) REFERENCES teams(team_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE players_games(
	game_id INT NOT NULL,
	player_id INT NOT NULL,
	points INT NOT NULL,
	PRIMARY KEY(game_id, player_id),
	FOREIGN KEY(game_id) REFERENCES games(game_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(player_id) REFERENCES players(player_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE ads(
	ad_id INT NOT NULL AUTO_INCREMENT,
	alias VARCHAR(255) NOT NULL,
	promotion_type VARCHAR(255),
	redirect_to TEXT NOT NULL,
	img TEXT NOT NULL,
	DESCRIPTION VARCHAR(255),
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY KEY(ad_id)
);

CREATE TABLE users_ads(
	user_id INT NOT NULL,
	ad_id INT NOT NULL,
	requested_quantities INT UNSIGNED NOT NULL,
	clicked_quantities INT UNSIGNED NOT NULL,
	PRIMARY KEY(user_id, ad_id),
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY(ad_id) REFERENCES ads(ad_id) ON UPDATE CASCADE ON DELETE RESTRICT
);