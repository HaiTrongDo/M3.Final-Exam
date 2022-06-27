CREATE DATABASE Module3_DB;


CREATE TABLE city(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
cityName varchar(40),
country_id varchar(40) REFERENCES country(country_id),
area INT,
population INT,
GDP INT,
cityDescription VARCHAR(255)
);


SELECT * FROM city;
INSERT INTO 
city(cityName,country_id,area,population,GDP,cityDescription) 
VALUES 
	('Hanoi',1,10000,8000,5000,'this is the capital of Vietnam');

CREATE TABLE country (
country_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
countryName varchar(40)
);

SELECT * FROM country;
INSERT INTO country(countryName) VALUES ('VietNam'),('Singapore'),('Malaysia');


DELIMITER $$
CREATE PROCEDURE insertCity (
		IN IcityName varchar(40),
        IN Icountry_id varchar(40),
        IN Iarea INT,
        IN Ipopulation INT,
        IN IGDP INT,
        IN IcityDescription VARCHAR(255)
)
BEGIN    
	INSERT INTO city(cityName, country_id, area, population, GDP, cityDescription) 
	VALUES 			(IcityName, Icountry_id, Iarea, Ipopulation, IGDP, IcityDescription) ;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE insertCountry (
		IN IcountryName varchar(40)
)
BEGIN    
	INSERT INTO city(countryName) 
	VALUES 			(IcountryName) ;
END$$
DELIMITER ;


-- update city
DROP PROCEDURE editCity;
DELIMITER $$
CREATE PROCEDURE editCity (
		IN Iid INT,
		IN IcityName varchar(40),
        IN Icountry_id INT,
        IN Iarea INT,
        IN Ipopulation INT,
        IN IGDP INT,
        IN IcityDescription VARCHAR(255)
)
BEGIN    
	UPDATE city SET 
    cityName = IcityName,
    country_id = Icountry_id, 
    area = Iarea,
    population = Ipopulation,
    GDP = IGDP,
    cityDescription = IcityDescription
	WHERE id = Iid;
END$$
DELIMITER ;
