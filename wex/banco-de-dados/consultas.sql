# buscar nome e ano dos filmes

SELECT Nome, Ano FROM Filmes;

# Buscar o nome e ano dos filmes, ordenados por ordem crescente pelo ano

SELECT Nome, Ano, Duracao FROM Filmes ORDER BY Ano ASC;

# Buscar pelo filme de volta para o futuro, trazendo o nome, ano e a duração

SELECT Nome, Ano, Duracao FROM Filmes WHERE Nome = 'De Volta para o Futuro';

# Buscar os filmes lançados em 1997

SELECT Nome, Ano, Duracao FROM Filmes WHERE Ano = 1997;

# Buscar os filmes lançados APÓS o ano 2000

SELECT Nome, Ano, Duracao FROM Filmes WHERE Ano > 2000;

# Buscar os filmes com a duracao maior que 100 e menor que 150, ordenando pela duracao em ordem crescente

SELECT Nome, Ano, Duracao FROM Filmes WHERE Duracao > 100 AND Duracao < 150 ORDER BY Duracao ASC;

# Buscar a quantidade de filmes lançadas no ano, agrupando por ano, ordenando pela duracao em ordem decrescente

SELECT Ano, COUNT(*) AS Quantidade FROM Filmes GROUP BY Ano ORDER BY Duracao DESC;

# Buscar os Atores do gênero masculino, retornando o PrimeiroNome, UltimoNome

SELECT Id, PrimeiroNome, UltimoNome, Genero FROM Atores WHERE Genero = 'M';

# Buscar os Atores do gênero feminino, retornando o PrimeiroNome, UltimoNome, e ordenando pelo PrimeiroNome

SELECT Id, PrimeiroNome, UltimoNome, Genero FROM Atores WHERE Genero = 'F' ORDER BY PrimeiroNome;

# Buscar o nome do filme e o gênero

SELECT Filmes.Nome, Generos.Genero
FROM Filmes
JOIN FilmesGenero ON Filmes.Id = FilmesGenero.IdFilme
JOIN Generos ON FilmesGenero.IdGenero = Generos.Id;

# Buscar o nome do filme e o gênero do tipo "Mistério"

SELECT Filmes.Nome, Generos.Genero
FROM Filmes
JOIN FilmesGenero ON Filmes.Id = FilmesGenero.IdFilme
JOIN Generos ON FilmesGenero.IdGenero = Generos.Id
WHERE Generos.Genero = 'Mistério';

# Buscar o nome do filme e os atores, trazendo o PrimeiroNome, UltimoNome e seu Papel

SELECT Filmes.Nome, Atores.PrimeiroNome, Atores.UltimoNome, ElencoFilme.Papel
FROM Filmes
JOIN ElencoFilme ON Filmes.Id = ElencoFilme.IdFilme
JOIN Atores ON ElencoFilme.IdAtor = Atores.Id;

