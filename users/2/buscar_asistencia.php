<?php require "../../seguridad.php"; ?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="description"  content=""/>
        <meta name="keywords" content=""/>
        <meta name="robots" content="ALL,FOLLOW"/>
        <meta name="Author" content="AIT"/>
        <meta http-equiv="imagetoolbar" content="no"/>
        <title>Sistema de Control: Busqueda</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="../../css/reset.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/screen.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/fancybox.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/jquery.wysiwyg.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/jquery.ui.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/visualize.css" type="text/css"/>
        <link rel="stylesheet" href="../../css/visualize-light.css" type="text/css"/>
        <link rel="stylesheet" type="../../text/css" href="css/ie7.css" />
    </head>

    <body>

        <div class="pagetop">
            <div class="head pagesize"> <!-- *** head layout *** -->
                <div class="head_top">
                    <div class="topbuts">
                        <ul class="clear">
                            <li><a href="#">Opciones</a></li>
                            <li><a href="../../salir.php" class="red">Salir</a></li>
                        </ul>

                        <div class="user clear">
                            <img src="../../images/avatar.jpg" class="avatar" alt="" />
                            <span class="user-detail">
                                <span class="name">Bienvenido, <?php echo $_SESSION["nombre"] . " " . $_SESSION["apellido"]; ?></span>
                                <span class="text">Logueado como <a href="#"><?php echo $_SESSION["usuario"]; ?></a></span>
                                <span class="text">Ultimo Acceso <a href="#"><?php echo $_SESSION["ultimo_acceso"]; ?></a></span>
                            </span>
                        </div>
                    </div>

                    <div class="logo clear">
                        <a href="index.php" title="Ver Panel de Administración">
                            <img src="../../images/logo.png" alt="" class="picture" />
                            <span class="textlogo">
                                <span class="title">Sistema de Control</span>
                                <span class="text">Panel de Administración</span>
                            </span>
                        </a>
                    </div>
                </div>

                <div class="menu">
                    <ul class="clear">
                        <li>
                            <a href="index.php">Panel de Administración</a>
                            <ul>
                                <li><a href="buscar_registro.php">Buscar Profesor</a></li>
                                <li><a href="reportes.php">Reportes</a></li>
                                <li><a href="horarios.php">Horarios</a></li>
                                <li><a href="materias.php">Materias</a></li>
                                <li><a href="asistencias.php">Asistencias</a></li>

                            </ul>
                        </li>
                        <li  class="active">
                            <a href="#">Buscar Asistencia</a>

                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="main pagesize"> <!-- *** mainpage layout *** -->
            <div class="main-wrap">

                <div class="page clear">

                    <!-- CONTENT BOX - DATATABLE -->
                    <div class="content-box">
                        <div class="box-body">
                            <div class="box-header clear">
                                <h2>Sistema de Busqueda de los Asistencia Marcadas en el Sistema</h2>
                            </div>

                            <div class="box-wrap clear">

                                <!-- TABLE -->
                                <div id="data-table">
                                    <p>Tabla de contenido de las todos los registros insertados en el sistema de control de asistencias del personal</p> 

                                    <form method="post" action="#">

                                        <table class="style1 datatable">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center;">Id. de Registro</th>
                                                    <th>C.I. de Registro</th>
                                                    <th>Asignatura</th>
                                                    <th>Fecha</th>
                                                    <th>H. Entrada</th>
                                                    <th>H. Salida</th>
                                                    <th style="text-align: center;">H. Trabajadas</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php
                                                include '../../conex.php';
                                                $sql = "SELECT a.id as id_asistencia, p.ci, a.fecha, m.materia, a.h_entrada, a.h_salida, a.h_trabajadas, p.id
FROM asistencias AS a, personas AS p, materias AS m, horarios AS h
WHERE a.id_persona = p.id AND a.id_materia = m.id AND a.id_horario = h.id
GROUP BY a.id
ORDER BY a.id DESC
";
                                                $result = mysql_query($sql);
                                                while (@$A = mysql_fetch_array($result)) {
                                                    ?>
                                                    <tr>
                                                        <td style="text-align: center; "><?php echo $A["id_asistencia"] ?></td>
                                                        <td><?php echo $A["ci"] ?></td>
                                                        <td><?php echo $A["materia"] ?></td>
                                                        <td><?php echo $A["fecha"] ?></td>
                                                        <td><?php echo $A["h_entrada"] ?></td>
                                                        <td><?php echo $A["h_salida"] ?></td>
                                                        <td style="text-align: center;"><?php echo $A["h_trabajadas"] ?></td>
                                                    </tr>
                                                <?php } ?>

                                            </tbody>
                                        </table>

                                    </form>
                                </div><!-- /#table -->


                            </div><!-- end of box-wrap --><div class="rule"></div>
                        </div> <!-- end of box-body -->
                    </div> <!-- end of content-box -->

                </div><!-- end of page -->
            </div>
        </div>

        <div class="footer">
            <div class="pagesize clear">
                <p class="bt-space15"><span class="copy"><strong>© 2011 Todos los Derechos Reservados <a href="http://www.SICA.com/">SICA</a></strong></span> Desarrollado por <a href="http://www.psmporlamar.edu.ve">IUPSM</a></p>
            </div>
        </div>

        <script type="text/javascript" src="../../js/jquery.js"></script>
        <script type="text/javascript" src="../../js/jquery.visualize.js"></script>
        <script type="text/javascript" src="../../js/jquery.wysiwyg.js"></script>
        <script type="text/javascript" src="../../js/tiny_mce/jquery.tinymce.js"></script>
        <script type="text/javascript" src="../../js/jquery.fancybox.js"></script>
        <script type="text/javascript" src="../../js/jquery.idtabs.js"></script>
        <script type="text/javascript" src="../../js/jquery.datatables.js"></script>
        <script type="text/javascript" src="../../js/jquery.jeditable.js"></script>
        <script type="text/javascript" src="../../js/jquery.ui.js"></script>
        <script type="text/javascript" src="../../js/jquery.jcarousel.js"></script>
        <script type="text/javascript" src="../../js/jquery.validate.js"></script>

        <script type="text/javascript" src="../../js/excanvas.js"></script>
        <script type="text/javascript" src="../../js/cufon.js"></script>
        <script type="text/javascript" src="../../js/Zurich_Condensed_Lt_Bd.js"></script>
        <script type="text/javascript" src="../../js/script.js"></script>
    </body>
</html>
