<?php
  $info = phpinfo();
  echo "<p>$info</p>";
	$link = pg_connect("Server=durga.jrc.org;Port=5432;User Id=usrgeo;Password=U5493o;Database=dbgeo;");
  $result = pg_exec($link, "SELECT gid, country_na as name FROM geodata.level1");
  $numrows = pg_numrows($result);
  echo "<p>link = $link<br>
  result = $result<br>
  numrows = $numrows</p>
  ";
?>
