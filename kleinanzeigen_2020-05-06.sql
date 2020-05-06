# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.4.12-MariaDB)
# Database: kleinanzeigen
# Generation Time: 2020-05-06 7:39:52 AM +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table anzeigen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `anzeigen`;

CREATE TABLE `anzeigen` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(80) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `vb` tinyint(1) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `anzeigen` WRITE;
/*!40000 ALTER TABLE `anzeigen` DISABLE KEYS */;

INSERT INTO `anzeigen` (`id`, `title`, `description`, `name`, `location`, `price`, `vb`, `email`, `creation_date`)
VALUES
	(1,'Mountainbike zu verkaufen','Fast wie neu und kaum benutzt. Wie alle Dinge die hier zum verkauf stehen :D','Sascha','Köln',10.88,1,'zeng@me.com','2020-04-24 08:46:29'),
	(2,'Airpods','Funktionieren nicht mehr richtig. An Bastler zu verkaufen.\n','Alex','Wiesbaden',122.98,1,'dfvdf','2019-05-06 08:24:42'),
	(3,'Apple iPhone 11 Pro','Selling a new iPhone with a little scratch on the back. Display works fine but the lock button doesn\'t work properly. I also give away a pair of headphones and a case','Ryan','Aachen',940.95,0,'iPhonefreak@apple.com','2020-04-27 08:46:29'),
	(4,'Husband for sale','He\'s driving me crazy.','Mary','Cottbus',1,0,'getlost@help.com','2019-05-06 08:24:42'),
	(5,'Unused Mask - Trust Me!','Coronaaaa!!!! Ahhhhh!!!! I give away a beautiful handmade mask. The mask is unused. Trust me on that!','Bruce','Bonn',20,1,'coronaguy@health.org','2020-04-17 08:46:29'),
	(6,'2 Chilly\'s Bottles','A pair of lovely bottles. One in an awesome dark red like a very good red wine, and the other in a fantastic 80s pink with yellow geometry symbols','Max','Berlin',40,0,'bottlepal@chily.com','2020-05-06 08:23:10'),
	(7,'Searching for a chef','We don\'t have time for cooking. So we are looking for a chef who will cook and serve us dinner five times a week. You should have at least 3 years of experience. Note: Cooking naked is not allowed.','Rita','Bremen',40,0,'rita@needshelp.com','2020-04-30 08:46:29'),
	(8,'Roommate wanted!','Our pal is moving out to his girlfriend (good luck with that, buddy) and we\'re looking for a new roommate. So if you have a new Playstation 4 Pro you\'re in!','Alex','Dortmund',432.74,0,'ps4@roommate.com','2019-05-06 08:24:42'),
	(9,'Give away a PlayStation 4','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Brad','Düsseldorf',280,0,'ps4@roommate.com','2020-05-06 08:33:47'),
	(10,'IT Books','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Brad','Essen',42.58,1,'someone@emarket.com','2020-05-01 08:34:33'),
	(11,'MacBook Pro 13 inch with mouse and case','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Sosef','Frankfurt am Main',1245.9,0,'someone@emarket.com','2020-05-02 08:35:09'),
	(12,'2 pair of Vans old skool','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Michigans','Hamburg',34,0,'someone@emarket.com','2020-05-03 08:35:43'),
	(13,'27 inch Mountainbike','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Peter','Koblenz',340.22,0,'someone@emarket.com','2019-05-04 08:24:42'),
	(14,'Selling my old Ford Galaxie 500','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Lars','Köln',32490,1,'someone@emarket.com','2020-05-06 08:37:06'),
	(15,'Suzuki GSX R for sale','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Josh','Mainz',7020.75,1,'someone@emarket.com','2020-05-06 08:37:49'),
	(16,'Gibson Les Paul with case','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Paul','München',572.9,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(17,'Pearl Drumkit','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Aaron','Münster',1322,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(18,'Looking for a new bowling partner','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Rita','Recklinghausen',0,1,'someone@emarket.com','2020-02-12 08:39:24'),
	(19,'Dinner in the dark - two coupons giveaway','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Marc','Siegen',63.87,1,'someone@emarket.com','2020-03-14 08:39:55'),
	(20,'CD Collection - Various Artists 500 pieces','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Shane','Trier',240,1,'someone@emarket.com','2020-05-06 08:40:18'),
	(21,'Ikea storage shelf in white for sale','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Billy','Wiesbaden',35,1,'someone@emarket.com','2020-05-06 08:40:44'),
	(22,'Need someone who wants to go skydiving with me','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Neil','Wuppertal',22.9,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(23,'Airpods Pro fast wie neu','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Eric','Wiesbaden',140.55,1,'someone@emarket.com','2020-05-06 08:41:56'),
	(24,'MacBook Air 13 Inch','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Lars','Berlin',590.9,1,'someone@emarket.com','2020-05-06 08:42:43'),
	(25,'Katzenbabys abzugeben','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Laura','Berlin',200,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(26,'WG zu vermieten','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Kristina','Berlin',420.9,1,'someone@emarket.com','2020-05-06 08:43:44'),
	(27,'2 Carhartt Shirts','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Michelle','Köln',23.23,1,'someone@emarket.com','2020-05-06 08:44:38'),
	(28,'Traktor','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Elena','München',654,1,'someone@emarket.com','2020-05-06 08:45:21'),
	(29,'Damenrad mit Korb','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Daniela','Münster',199,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(30,'Strandkorb','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Sandra','Essen',99.99,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(31,'Antike Schüsseln','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Alexandra','Wiesbaden',99.99,1,'someone@emarket.com','2019-05-06 08:24:42'),
	(32,'Apothekerflaschen diverse Größen','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam','Anna','Mainz',99.99,1,'someone@emarket.com','2020-05-06 08:47:31');

/*!40000 ALTER TABLE `anzeigen` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
