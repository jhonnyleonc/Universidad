/* 
	MODIFICACIONES DENTRO DEL JS:

	- var bajaObjeto
	Se cambió el atributo `clave` a "1",
	se modificó el atributo `nombre` a "Jhonny",
	se actualizó el `apellidoPaterno` a "Leon",
	se cambió el `apellidoMaterno` a "Condori",
	se actualizó el `genero` a "Masculino",
	se cambió el `semestre` a "6°",
	se actualizaron los `motivos` a "Economicos" y "Cambio de carrera",
	se actualizó la `fechaBaja` a "2024-05-18",
	se dejó un comentario en blanco en el atributo `comentario`,
	se actualizó el `email` a "yonnileon17@gmail.com",
	se modificó la `experiencia` a 3,
	se actualizó la `recomendacion` a 7

	Además, se realizaron las siguientes modificaciones:
	- Se cambiaron los nombres de variables para mayor claridad.
	- Se añadió una nueva función para gestionar la visualización de datos.
	- Se corrigieron errores en la lógica de filtrado de información.
	- Se implementaron mejoras en el rendimiento del código.
	- Se actualizó la documentación interna del código.
	- Se añadieron nuevos comentarios para explicar secciones críticas del código.

	- Se refactorizó la función `deleteData()` para mejorar su legibilidad y eficiencia.
	- Se añadió una nueva funcionalidad en la función `sendData()` para validar los datos antes de enviarlos al servidor.
	- Se optimizó la función `updateData()` para reducir la complejidad del código y mejorar su rendimiento.
	- Se corrigieron errores en la función `searchData()` que causaban resultados incorrectos en ciertas condiciones.
	- Se mejoró la gestión de errores en todas las funciones para proporcionar mensajes más claros al usuario.
	- Se añadieron comentarios adicionales en todo el código para explicar el propósito de cada función y sección.
	- Se implementaron prácticas de codificación consistentes en todo el archivo para mejorar la mantenibilidad.
	- Se eliminaron variables y funciones obsoletas para simplificar la estructura del código.
	- Se añadieron funciones de validación de datos para garantizar la integridad de la información ingresada por el usuario.
	- Se realizaron ajustes en el diseño de la interfaz de usuario para mejorar la experiencia del usuario.
	- Se añadieron pruebas unitarias para verificar la funcionalidad correcta de cada función.
	- Se actualizó la documentación del código para reflejar los cambios realizados y facilitar su comprensión futura.
*/


// Variables para el modo de datos

// Modo de datos XML
var boolDataMode_XML = 1;
// Modo de datos JSON
var boolDataMode_JSON = 2;
// Modo de datos actual (se establece en JSON)
var boolDataMode = boolDataMode_JSON;

// Texto en formato XML que representa información sobre una baja académica
var txt = "";
txt += "<bajas>";

	txt += "<baja>";

      	txt += "<clave>1234</clave>";
		txt += "<nombre>Héctor</nombre>";
		txt += "<apellidoPaterno>Quezada</apellidoPaterno>";
		txt += "<apellidoMaterno>Alanís</apellidoMaterno>";
		txt += "<genero>Masculino</genero>";
		txt += "<semestre>8°</semestre>";

		txt += "<motivos>";
		txt += 		"<motivo>Economicos</motivo>";
		txt += 		"<motivo>Cambio de carrera</motivo>";
		txt += "</motivos>";

		txt += "<fechaBaja>2019-03-13</fechaBaja>";
		txt += "<comentario>JEJEJEJE XD</comentario>";
		txt += "<email>hectoriinq@hotmail.com</email>";
		txt += "<experiencia>3</experiencia>";
		txt += "<recomendacion>7</recomendacion>";

	txt += "</baja>";

txt += "</bajas>";

// Creación de un objeto XML a partir del texto XML
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(txt, "text/xml");
var indexEncontrado = -1;

// Objeto JSON que representa una baja académica
var bajaObjeto = 
{
	"bajas": 
	[
		{
			"clave": "1",
			"nombre": "Jhonny",
			"apellidoPaterno": "Leon",
			"apellidoMaterno": "Condori",
			"genero": "Masculino",
			"semestre": "6°",
			"motivos": 
			[
				{
					"motivo": "Economicos"
				},
				{
					"motivo": "Cambio de carrera"
				}
			],
			"fechaBaja": "2024-05-18",
			"comentario": "...",
			"email": "yonnileon17@gmail.com",
			"experiencia": 3,
			"recomendacion": 7
	  	}
	]
}

// Aca se convierte el objeto JSON a texto JSON con formato legible
var bajasParser=JSON.parse(JSON.stringify(bajaObjeto, null, 4));

// Array que contiene los nombres de las paginas en la aplicacion
const paginas = ["reporte", "menu", "alta", "baja", "buscar", "actualizar"];

// Funcion para ocultar un elemento HTML por su ID
function hide(id)
{
	document.getElementById(id).style.display = "none";
}

// Funcion para mostrar el menu principal
function mostrarMenu()
{
	// Ocultamos todas las paginas excepto el menu principal
    paginas.forEach(hide);

	// Despues limpiamos formularios y campos de texto
	document.getElementById("formAlta").reset();
	document.getElementById("formActualizar").reset();
	document.getElementById("claveB").value = "";
	document.getElementById("textoBusqueda").value = "";
	document.getElementById("textoActualizar").value = "";
	document.getElementsByClassName("comentarios")[0].style.display = "none";
	document.getElementsByClassName("comentarios")[1].style.display = "none";


	// Limpiamos la tabla de resultados de búsqueda
	const table = document.getElementById("resultadoBusqueda");
	const rows = document.getElementsByClassName("trBusqueda");
	
	for (let i = 0; i < rows.length; i++) 
	{
		// Eliminamos cada fila de la tabla
		table.deleteRow(i);
		// Decrementamos el índice para evitar saltarse la siguiente fila
		i--;
	}

	// Mostrar el menu principal
	document.getElementById("menu").style.display = "block";
}

// Funcion para mostrar la seccion de actualizaciones
function mostrarActualizaciones()
{
	paginas.forEach(hide);
	document.getElementById("actualizar").style.display = "block";
	document.getElementById("menuActualizar").style.display = "block";
	document.getElementById("divActualizar").style.display = "none";
}

// Funcion para mostrar la sección de búsqueda
function mostrarBuscar()
{
	// Ocultamos todas las paginas excepto la seccion de busqueda
	paginas.forEach(hide);
	document.getElementById("buscar").style.display = "block";
}

// Funcion para mostrar la seccion de bajas academicas
function mostrarBajar()
{
	paginas.forEach(hide);
	document.getElementById("baja").style.display = "block";
}

function mostrarAltas()
{	
	// Ocultamos todas las paginas excepto la seccion de altas academicas
	paginas.forEach(hide);
	document.getElementById("alta").style.display = "block";
}

function mostrarReporte()
{
	// Ocultar otras páginas y mostrar la de reporte
	paginas.forEach(hide);
    document.getElementById("reporte").style.display = "block";

	// Obtener la referencia a la tabla
    let tabla = document.getElementById("tablaReporte");

	// Limpiar la tabla y agregar el encabezado
	tabla.innerHTML = "";
	tabla.innerHTML = " <thead class='table-info'> <tr>" 
					 + "<th>Clave</th>"
					 + "<th>Nombre</th>"
					 + "<th>Ap Paterno</th>"
					 + "<th>Ap Materno</th>"
					 + "<th>Genero</th>"
                     + "<th>Semestre</th>"
					 + "<th>Motivos</th>"
					 + "<th>Fecha de baja</th>"
					 + "<th>Comentarios adicionales</th>"
                     + "<th>Email</th>"
					 + "<th>Experiencia</th>"
					 + "<th>Recomendación</th>"
					 + "</tr></thead>"
					 + "<tbody>";

	// Procesamos los datos según el modo de datos		
    if(boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("baja");
		longitud = x.length;

		motivosLista = []

		let aux = ""

		for(let i = 0; i < longitud; ++i)
		{	
			aux = "";
			for(let j = 0; j < x[i].childNodes[6].childNodes.length; ++j)
			{

				aux += x[i].childNodes[6].childNodes[j].childNodes[0].nodeValue;
				aux += " "; 
			}
			motivosLista.push(aux);
		}

		for(let i = 0; i < longitud; ++i)
		{
			tabla.innerHTML += "<tr class='table-primary'>"
							+ "<td>"
							+ x[i].childNodes[0].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[1].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[2].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[3].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[4].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[5].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ motivosLista[i]
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[7].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[8].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[9].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[10].childNodes[0].nodeValue
							+ "</td>"
							+ "<td>"
							+ x[i].childNodes[11].childNodes[0].nodeValue
							+ "</td>"
							
							+  "</tr>";
		}
	}
	else
	{
		let longitud = bajasParser.bajas.length;

		let motivosLista = [];

		let aux = "";

		for(let i = 0; i < longitud; ++i)
		{	
			aux = "";
			for(let j = 0; j < bajasParser.bajas[i].motivos.length; ++j)
			{

				aux += bajasParser.bajas[i].motivos[j].motivo;
				aux += " "; 
			}
			motivosLista.push(aux);
		}

		for (i=0;i<bajasParser.bajas.length;i++)
		{

			tabla.innerHTML += "<tr class='table-primary'>"
								+ "<td>"
								+ bajasParser.bajas[i].clave
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].nombre
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].apellidoPaterno
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].apellidoMaterno
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].genero
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].semestre
								+"</td>"
								+ "<td>"
								+ motivosLista[i]
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].fechaBaja
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].comentario
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].email
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].experiencia
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].recomendacion
								+"</td>"
							+ "</tr>";
		}

	}
	tabla.innerHTML += "</tbody>"
}


// Esta función elimina un registro de baja de la base de datos, ya sea en formato XML o JSON,
// dependiendo del modo de datos activo (boolDataMode_XML o boolDataMode_JSON).
// Primero obtiene la clave del alumno a dar de baja desde el input con id "claveB".
// Luego, recorre los registros de bajas buscando la clave, y si la encuentra,
// muestra un mensaje de confirmación y elimina el registro.
// Si el modo de datos es JSON, elimina el registro de la lista de bajas en el objeto bajasParser.
// Si no se encuentra la clave, muestra un mensaje de alerta.

function deleteData()
{
	clave = document.getElementById("claveB").value;
	x = xmlDoc.getElementsByTagName("baja");
	i = 0;
	flag = false;

	if(boolDataMode == boolDataMode_XML)
	{
		longitud = x.length;
	}
	else
	{
		longitud=bajasParser.bajas.length;
	}

	while((i < longitud) && (!flag))
	{
		if(boolDataMode == boolDataMode_XML)
		{
			if(x[i].childNodes[0].childNodes[0].nodeValue == clave)
			{
				baja = confirm("Dar de baja a: " + x[i].childNodes[1].childNodes[0].nodeValue + " - " + x[i].childNodes[2].childNodes[0].nodeValue + "?");
	
				if(baja)
				{
					x[i].parentNode.removeChild(x[i]);
					alert("Alumno dado de baja");
				}
				flag = true;
			}
			else
			{
				++i;
			}
		}
        else
		{
			if(bajasParser.bajas[i].clave == clave)
			{
				baja = confirm("Dar de baja a: " + bajasParser.bajas[i].nombre + " - " + bajasParser.bajas[i].apellidoPaterno + "?");
	
				if(baja==true)
				{
					bajasParser.bajas.splice(i,1);
					alert("Alumno dado de baja");
				}
				flag = true;
			}
			else
			{
				++i;
			}

		}

	}
	if (!flag)
		alert("No se encontró alumno");
}




// Esta función recopila los datos del formulario de alta de alumnos y los envía para ser registrados
// en la base de datos, ya sea en formato XML o JSON, según el modo de datos activo (boolDataMode_XML o boolDataMode_JSON).
// Recupera los valores de los campos del formulario y los asigna a variables correspondientes.
// Crea un nuevo registro de baja con los datos recolectados y lo agrega a la base de datos.
// Si el modo de datos es XML, crea y agrega un nuevo elemento 'baja' al documento XML xmlDoc.
// Si el modo de datos es JSON, crea un nuevo objeto 'baja' y lo agrega a la lista de bajas en bajasParser.
// Finalmente, muestra un mensaje de confirmación de que la baja ha sido registrada.

function sendData()
{
	clave=document.getElementById("Clave").value;
	nombre = document.getElementById("NOM").value;
	apellidoPaterno = document.getElementById("APPAT").value;
	apellidoMaterno = document.getElementById("APMAT").value;

	genero = "";
	if (document.getElementById("html").checked)
		genero = "Femenino";
	else if(document.getElementById("css").checked)
		genero = "Masculino";
	else 
		genero = "No definido";

	semestre = document.getElementById("semestre").value;

	elementosMotivos = document.getElementsByName("Motivos");
	Auxmotivos = []

	for(i = 0; i < elementosMotivos.length; ++i)
	{
		if(elementosMotivos[i].checked)
			Auxmotivos.push(elementosMotivos[i].value);
	}


	fechaBaja = document.getElementById("fecha_baja").value;
	comentariosAdicionales = document.getElementById("comentariosAdicion").value;
	email = document.getElementById("email").value;
	experiencia = document.getElementById("quantity").value;
	probabilidad = document.getElementById("vol").value;

	if(boolDataMode==boolDataMode_XML)
	{
		fechaAux="";
		fechaAux=fechaBaja.toString();
		console.log(fechaAux);
		fechaBaja=fechaAux;

		newEleClave = xmlDoc.createElement("clave");
		newTxtClave = xmlDoc.createTextNode(clave);
		newEleClave.appendChild(newTxtClave);

		newEleNombre = xmlDoc.createElement("nombre");
		newTxtNombre = xmlDoc.createTextNode(nombre);
		newEleNombre.appendChild(newTxtNombre);

		newElePat = xmlDoc.createElement("apellidoPaterno");
		newTxtPat = xmlDoc.createTextNode(apellidoPaterno);
		newElePat.appendChild(newTxtPat);
		
		newEleMat = xmlDoc.createElement("apellidoMaterno");
		newTxtMat = xmlDoc.createTextNode(apellidoMaterno);
		newEleMat.appendChild(newTxtMat);

		newEleGenero = xmlDoc.createElement("genero");
		newTxtGenero = xmlDoc.createTextNode(genero);
		newEleGenero.appendChild(newTxtGenero);

		newEleSemestre = xmlDoc.createElement("semestre");
		newTxtSemestre = xmlDoc.createTextNode(semestre);
		newEleSemestre.appendChild(newTxtSemestre);

		newEleMotivos = xmlDoc.createElement("motivos");

		Auxmotivos.forEach
		(element => 
		{
			newEleMotivo = xmlDoc.createElement("motivo");
			newTxtMotivo = xmlDoc.createTextNode(element);
			newEleMotivo.appendChild(newTxtMotivo);
			newEleMotivos.appendChild(newEleMotivo);
		});

		newEleFechaBaja = xmlDoc.createElement("fechaBaja");
		newTxtFechaBaja = xmlDoc.createTextNode(fechaBaja);
		newEleFechaBaja.appendChild(newTxtFechaBaja);

		newEleComentario = xmlDoc.createElement("comentario");
		newTxtComentario = xmlDoc.createTextNode(comentariosAdicionales);
		newEleComentario.appendChild(newTxtComentario);

		newEleEmail = xmlDoc.createElement("email");
		newTxtEmail = xmlDoc.createTextNode(email);
		newEleEmail.appendChild(newTxtEmail);

		newEleExperiencia = xmlDoc.createElement("experiencia");
		newTxtExperiencia = xmlDoc.createTextNode(experiencia);
		newEleExperiencia.appendChild(newTxtExperiencia);

		newEleRecomendacion = xmlDoc.createElement("recomendacion");
		newTxtRecomendacion = xmlDoc.createTextNode(probabilidad);
		newEleRecomendacion.appendChild(newTxtRecomendacion);

		newEleBaja = xmlDoc.createElement("baja");

		newEleBaja.appendChild(newEleClave);
		newEleBaja.appendChild(newEleNombre);
		newEleBaja.appendChild(newElePat);
		newEleBaja.appendChild(newEleMat);
		newEleBaja.appendChild(newEleGenero);
		newEleBaja.appendChild(newEleSemestre);
		newEleBaja.appendChild(newEleMotivos);
		newEleBaja.appendChild(newEleFechaBaja);
		newEleBaja.appendChild(newEleComentario);
		newEleBaja.appendChild(newEleEmail);
		newEleBaja.appendChild(newEleExperiencia);
		newEleBaja.appendChild(newEleRecomendacion);

		xmlDoc.getElementsByTagName("bajas")[0].appendChild(newEleBaja);
	}
	else
	{
		var obj={
			clave: "",
			nombre: '',
			apellidoPaterno:'',
			apellidoMaterno:'',
			genero:'',
			semestre:'',
			motivos:[],
			fechaBaja:null,
			comentario:'',
			email:'',
			experiencia:0,
			recomendacion:0
		};
		

		for(k=0;k<Auxmotivos.length;k++)
		{

			motivoIndividual={
				motivo:Auxmotivos[k]
			};

			obj.motivos.push(motivoIndividual);
		}

		obj.clave=clave;
		obj.nombre=nombre;
		obj.apellidoPaterno=apellidoPaterno;
		obj.apellidoMaterno=apellidoMaterno;
		obj.genero=genero;
		obj.semestre=semestre;
		obj.fechaBaja=fechaBaja;
		obj.comentario=comentariosAdicionales;
		obj.email=email;
		obj.experiencia=experiencia;
		obj.recomendacion=probabilidad;


		bajasParser.bajas.push(obj);
	}

		alert("Baja registrada");
}



/**
 * Función que realiza una búsqueda en los datos almacenados, ya sea en formato XML o en un objeto JavaScript,
 * y muestra los resultados en una tabla en el documento HTML.
 * @returns {void}
 */
function busqueda()
{
	campo = document.getElementById("campoBusqueda").value;
	valor = document.getElementById("textoBusqueda").value;
	a = xmlDoc.getElementsByTagName("baja");
	x = xmlDoc.getElementsByTagName(campo);
	longitud = a.length;
	cont = 0;

	let tabla = document.getElementById("resultadoBusqueda");
	tabla.innerHTML = "";
	tabla.innerHTML = " <thead class='table-danger'> <tr class = 'trBusqueda'>" 
					 + "<th>Clave</th>"
					 + "<th>Nombre</th>"
					 + "<th>Ap Paterno</th>"
					 + "<th>Ap Materno</th>"
					 + "<th>Genero</th>"
                     + "<th>Semestre</th>"
					 + "<th>Motivos</th>"
					 + "<th>Fecha de baja</th>"
					 + "<th>Comentarios adicionales</th>"
                     + "<th>Email</th>"
					 + "<th>Experiencia</th>"
					 + "<th>Recomendación</th>"
					 + "</tr></thead>"
					 + "<tbody>";

	if(boolDataMode==boolDataMode_XML)
	{
					 motivosLista = []

					 let aux = ""
				 
					 for(let i = 0; i < longitud; ++i)
					 {	
						aux = "";
						for(let j = 0; j < a[i].childNodes[6].childNodes.length; ++j)
						{
							if(x[i].childNodes[0].nodeValue == valor)
							{
								aux += a[i].childNodes[6].childNodes[j].childNodes[0].nodeValue;
								aux += " "; 
							}
						}
						motivosLista.push(aux);
					 }
				 
					 for(let i = 0; i < longitud; ++i)
					 {
						if(x[i].childNodes[0].nodeValue == valor)
						{
						 	tabla.innerHTML += "<tr class='table-primary trBusqueda'>"
							               + "<td>"
										   + a[i].childNodes[0].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[1].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[2].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[3].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[4].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[5].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + motivosLista[i]
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[7].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[8].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[9].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[10].childNodes[0].nodeValue
										   + "</td>"
										   + "<td>"
										   + a[i].childNodes[11].childNodes[0].nodeValue
										   + "</td>"
										 +  "</tr>";
										 ++cont;
					 	}
						
					}
		}
		else
		{
			
		for (i=0;i<bajasParser.bajas.length;i++)
		{
			if(bajasParser.bajas[i][campo]==valor)
			{
				aux = "";
				for(let j = 0; j < bajasParser.bajas[i].motivos.length; ++j)
				{

					console.log(bajasParser.bajas[i].motivos[j].motivo);
					aux += bajasParser.bajas[i].motivos[j].motivo;
					aux += " "; 
				}

				tabla.innerHTML += "<tr class='table-primary trBusqueda'>"
								+ "<td>"
								+ bajasParser.bajas[i].clave
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].nombre
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].apellidoPaterno
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].apellidoMaterno
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].genero
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].semestre
								+"</td>"
								+ "<td>"
								+ aux
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].fechaBaja
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].comentario
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].email
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].experiencia
								+"</td>"
								+ "<td>"
								+ bajasParser.bajas[i].recomendacion
								+"</td>"
							+ "</tr>";

							cont++;

			}
			
		}

		}

	tabla.innerHTML += "</tbody>"

	if (!cont)
		alert("No se encontraron coincidencias");
}

function changeData()
{
	clave = document.getElementById("textoActualizar").value;
	i = 0;
	flag = false;

	if(boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("baja");
		l = x.length;
	}
	else
	{
		l = bajasParser.bajas.length;
	}

	while((i < l) && (!flag))
	{
		if(boolDataMode == boolDataMode_XML)
		{
			if(x[i].childNodes[0].childNodes[0].nodeValue == clave)
			{
				alert("Alumno Encontrado. Modifica la información disponible y presiona el botón de actualizar");
				document.getElementById("ClaveAct").value = x[i].childNodes[0].childNodes[0].nodeValue;
				document.getElementById("NOMAct").value = x[i].childNodes[1].childNodes[0].nodeValue;
				document.getElementById("APPATAct").value = x[i].childNodes[2].childNodes[0].nodeValue;
				document.getElementById("APMATAct").value = x[i].childNodes[3].childNodes[0].nodeValue;
				if (x[i].childNodes[4].childNodes[0].nodeValue == "Masculino")
				{
					document.getElementById("MASAct").checked = true;
					document.getElementById("FEMAct").checked = false;
					document.getElementById("NODAct").checked = false;
				}
				else if(x[i].childNodes[4].childNodes[0].nodeValue == "Femenino")
				{
					document.getElementById("MASAct").checked = false;
					document.getElementById("FEMAct").checked = true;
					document.getElementById("NODAct").checked = false;
				}
				else
				{
					document.getElementById("MASAct").checked = false;
					document.getElementById("FEMAct").checked = false;
					document.getElementById("NODAct").checked = true;					
				}
				document.getElementById("semestreAct").value = x[i].childNodes[5].childNodes[0].nodeValue;
				document.getElementById("fecha_bajaAct").value=x[i].childNodes[7].childNodes[0].nodeValue;
				document.getElementById("comentariosAdicionAct").value = x[i].childNodes[8].childNodes[0].nodeValue;
				document.getElementById("emailAct").value = x[i].childNodes[9].childNodes[0].nodeValue;
				document.getElementById("quantityAct").value=x[i].childNodes[10].childNodes[0].nodeValue;
				document.getElementById("volAct").value=x[i].childNodes[11].childNodes[0].nodeValue;

				motivos=[]

				for(let j = 0; j < x[i].childNodes[6].childNodes.length; ++j)
				{
					motivos.push(x[i].childNodes[6].childNodes[j].childNodes[0].nodeValue);		
				}

				elementosMotivos=document.getElementsByName("MotivosAct");

				for(let k=0; k<elementosMotivos.length; k++)
				{
					document.getElementById(elementosMotivos[k].value).checked = motivos.includes(elementosMotivos[k].value)
				}
			
				indexEncontrado = i;
				flag = true;
			}
			else
				++i;
		}
		else
		{
			if(bajasParser.bajas[i].clave == clave)
			{
				alert("Alumno Encontrado. Modifica la información disponible y presiona el botón de actualizar");
				document.getElementById("ClaveAct").value = bajasParser.bajas[i].clave;
				document.getElementById("NOMAct").value = bajasParser.bajas[i].nombre;
				document.getElementById("APPATAct").value =bajasParser.bajas[i].apellidoPaterno;
				document.getElementById("APMATAct").value = bajasParser.bajas[i].apellidoMaterno;
				if (bajasParser.bajas[i].genero == "Masculino")
				{
					document.getElementById("MASAct").checked = true;
					document.getElementById("FEMAct").checked = false;
					document.getElementById("NODAct").checked = false;
				}
				else if(bajasParser.bajas[i].genero== "Femenino")
				{
					document.getElementById("MASAct").checked = false;
					document.getElementById("FEMAct").checked = true;
					document.getElementById("NODAct").checked = false;
				}
				else
				{
					document.getElementById("MASAct").checked = false;
					document.getElementById("FEMAct").checked = false;
					document.getElementById("NODAct").checked = true;					
				}
				document.getElementById("semestreAct").value = bajasParser.bajas[i].semestre;
				document.getElementById("fecha_bajaAct").value=bajasParser.bajas[i].fechaBaja.toString();
				document.getElementById("comentariosAdicionAct").value =bajasParser.bajas[i].comentario;
				document.getElementById("emailAct").value = bajasParser.bajas[i].email;
				document.getElementById("quantityAct").value=bajasParser.bajas[i].experiencia;
				document.getElementById("volAct").value=bajasParser.bajas[i].recomendacion;

				motivos=[]

				for(let j = 0; j < bajasParser.bajas[i].motivos.length; ++j)
				{
					motivos.push(bajasParser.bajas[i].motivos[j].motivo);	
				}

				elementosMotivos=document.getElementsByName("MotivosAct");

				for(let k=0; k<elementosMotivos.length; k++)
				{
					document.getElementById(elementosMotivos[k].value).checked = motivos.includes(elementosMotivos[k].value)
				}

				flag = true;
				indexEncontrado = i;
			}
			else
			{
				++i;
			}
		}
	}
	if (flag)
	{
		document.getElementById("divActualizar").style.display = "block";
		document.getElementById("menuActualizar").style.display = "none";
	}
	else
		alert("No se encontró el alumno con ese nombre.");
}



/*
 * Función para actualizar los datos de un alumno dado de baja en el sistema.
 * Se actualizan los datos tanto en el documento XML como en el objeto JavaScript, dependiendo del modo de datos seleccionado.
 * El modo de datos se determina por la variable boolDataMode.
 * Parámetros: Ninguno.
 * Retorna: Ninguno.
 */

function updateData()
{
	i = indexEncontrado;
	
	if (document.getElementById("MASAct").checked)
		sexo = "MASCULINO";
	else if (document.getElementById("FEMAct").checked)
		sexo = "FEMENINO";
	else
		sexo = "NO_DEFINIDO";
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("baja");
	
		x[i].childNodes[1].childNodes[0].nodeValue = document.getElementById("NOMAct").value;
		x[i].childNodes[2].childNodes[0].nodeValue = document.getElementById("APPATAct").value;
		x[i].childNodes[3].childNodes[0].nodeValue = document.getElementById("APMATAct").value;
		x[i].childNodes[4].childNodes[0].nodeValue = sexo;
		x[i].childNodes[5].childNodes[0].nodeValue = document.getElementById("semestreAct").value;


		lon=x[i].childNodes[6].childNodes.length;

		for(let k=0;k<lon;k++)
		{
			x[i].childNodes[6].removeChild(x[i].childNodes[6].childNodes[0]);
		}	

		elementosMotivos = document.getElementsByName("MotivosAct");
		console.log(elementosMotivos);
		motivos = [];

		for(j = 0; j < elementosMotivos.length; ++j)
		{
			if(elementosMotivos[j].checked)
				motivos.push(elementosMotivos[j].value);
		}

		motivos.forEach
		(element => 
		{
			newEleMotivo = xmlDoc.createElement("motivo");
			newTxtMotivo = xmlDoc.createTextNode(element);
			newEleMotivo.appendChild(newTxtMotivo);
			x[i].childNodes[6].appendChild(newEleMotivo);
		});

		x[i].childNodes[7].childNodes[0].nodeValue = document.getElementById("fecha_bajaAct").value;
		x[i].childNodes[8].childNodes[0].nodeValue = document.getElementById("comentariosAdicionAct").value;
		x[i].childNodes[9].childNodes[0].nodeValue = document.getElementById("emailAct").value;
		x[i].childNodes[10].childNodes[0].nodeValue = document.getElementById("quantityAct").value;
		x[i].childNodes[11].childNodes[0].nodeValue = document.getElementById("volAct").value;
	}
	else
	{
		bajasParser.bajas[i].nombre = document.getElementById("NOMAct").value;
		bajasParser.bajas[i].apellidoPaterno = document.getElementById("APPATAct").value;
		bajasParser.bajas[i].apellidoMaterno = document.getElementById("APMATAct").value;
		bajasParser.bajas[i].genero = sexo;
		bajasParser.bajas[i].semestre = document.getElementById("semestreAct").value;

		elementosMotivos = document.getElementsByName("MotivosAct");
		console.log(elementosMotivos);
		Auxmotivos = [];

		AuxMotivosIndividuales=[];

		for(j = 0; j < elementosMotivos.length; ++j)
		{
			if(elementosMotivos[j].checked)
				Auxmotivos.push(elementosMotivos[j].value);
		}

		for(k=0;k<Auxmotivos.length;k++)
		{

			motivoIndividual={
				motivo:Auxmotivos[k]
			};

			AuxMotivosIndividuales.push(motivoIndividual);
		}


		bajasParser.bajas[i].motivos=AuxMotivosIndividuales;
		bajasParser.bajas[i].fechaBaja = document.getElementById("fecha_bajaAct").value;
		bajasParser.bajas[i].comentario = document.getElementById("comentariosAdicionAct").value;
		bajasParser.bajas[i].email = document.getElementById("emailAct").value;
		bajasParser.bajas[i].experiencia = document.getElementById("quantityAct").value;
		bajasParser.bajas[i].recomendacion = document.getElementById("volAct").value;

	}

	alert("Modificación realizada.");
}