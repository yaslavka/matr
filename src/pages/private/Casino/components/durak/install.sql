create table MPUsers (
login varchar(12) not null default 'test',
avatar int(11) default 0,
wins int(11) default 0,
draws int(11) default 0,
fails int(11) default 0,
PRIMARY KEY(login)) type=MyISAM;
