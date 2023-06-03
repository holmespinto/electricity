<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2001-2017                                                *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/electry/claseapi');
		
		$tbl='electry_nomina';
		$app=new Electry($tbl);	
		
		switch ($_POST['opcion']) {
			case 'consultar':
				
				$DatosNomina=array();
				$DatosEmpleado=array();
				$Empleado=array();
				$EmpleadoNomina=array();
				$select='*';

				$tbl_empleados='electry_empleados';
				$app_empleados=new Electry($tbl_empleados);
				//$query_empleados="id='".$_POST['idEmpleado']."'";
				$rowEmpleado=$app_empleados->consultadatos('',$select);				
				foreach($rowEmpleado as $a => $value){
					$Salario=$value['Salario'];
					$DatosEmpleado['Empleado'][] = array(
                    'id'=>$value['id'],
                    'Identificacion'=>$value['Identificacion'],
                    'Nombres'=>$value['Nombres'],
                    'Apellidos'=>$value['Apellidos'],
                    'Email'=>$value['Email'],
                    'Cargo'=>$value['Cargo'],
                    'Salario'=>$value['Salario']
					);
					}	

				$tbl_empl='electry_nomina_empleados';
				$app_conc=new Electry($tbl_empl);
				$idNomina=$_POST['idEmpleado'];
				list($dias_restantes,$idNomi)=$app_conc->dias_restantes_mes();
				if(is_null($_POST['idNomina'])) {
					$idNomina=$idNomi;	
				}else{
					$idNomina=$_POST['idNomina'];
				}
				//GENERE EL LISTADO DE EMPLEADOS CON SU RESPECTIVANOMINA
				$rowEmpleado=$app_empleados->consultadatos('',$select);				
				foreach($rowEmpleado as $a => $row){
					$Salario=$row['Salario'];				
					$Empleado=$row['id'];
					$EmpleadoNomina['EmpleadoNomina'][]= array(
                    'Nomina'=>$idNomina,
                    'Empleado'=>$Empleado,
                    'Concepto'=>'Salario Básico',
                    'Cantidad'=>'0',
                    'Devengado'=>'$'.number_format($Salario, 2, ',', '.'),
                    'Deducido'=>'0',
                    'Dias'=>$dias_restantes,
                    'IdNomina'=>$idNomina
					);
					$query="Empleado='".$Empleado."'";
					$conceptos=$app_conc->consultadatos($query,$select);
					foreach($conceptos as $a => $adm){
						$Devengado[]=$adm['Devengado']*$adm['Cantidad'];
						$Deducido[]=$adm['Deducido']*$adm['Cantidad'];
						
						$EmpleadoNomina['EmpleadoNomina'][] = array(
						'id'=>$adm['id'],
						'Nomina'=>$adm['Nomina'],
						'Empleado'=>$adm['Empleado'],
						'Concepto'=>$adm['Concepto'],
						'Cantidad'=>$adm['Cantidad'],
						'Devengado'=>'$'.number_format($adm['Devengado']*$adm['Cantidad']),
						'Deducido'=>'$'.number_format($adm['Deducido']*$adm['Cantidad']),
						'Dias'=>$dias_restantes,
						'IdNomina'=>$idNomina
						);
					}					
				$EmpleadoNomina['EmpleadoNomina'][]= array(
                    'Nomina'=>$idNomina,
                    'Empleado'=>$Empleado,
                    'Concepto'=>'SUB TOTAL',
                    'Cantidad'=>'',
                    'Devengado'=>'$'.number_format(array_sum($Devengado)),
                    'Deducido'=>'$'.number_format(array_sum($Deducido)),
                    'Dias'=>$dias_restantes,
                    'IdNomina'=>$idNomina
					);				
				$EmpleadoNomina['EmpleadoNomina'][]= array(
                    'Nomina'=>$idNomina,
                    'Empleado'=>$Empleado,
                    'Concepto'=>'TOTAL',
                    'Cantidad'=>number_format($Salario+array_sum($Devengado)-array_sum($Deducido), 2, ',', '.'),
                    'Devengado'=>'',
                    'Deducido'=>'',
                    'Dias'=>$dias_restantes,
                    'IdNomina'=>$idNomina
					);				
				}
				// FIN GENERE EL LISTADO DE EMPLEADOS 

			$tbl_conc='electry_nomina_estados';
			$app_conc=new Electry($tbl_conc);			
				$query='';
				$select='*';
				$est=$app_conc->consultadatos($query,$select);
				foreach($est as $a => $adm){
					$EstadosNomina['EstadosNomina'][] = array(
                    'id'=>$adm['id'],
                    'value'=>$adm['Estado'],
                    'label'=>$adm['Estado'],
                    'Descripcion'=>$adm['Descripcion']);
				}


					
				$tbl_nomina='electry_nomina';
				$app_nomina=new Electry($tbl_nomina);
				$query_nomina="id='".$idNomina."'";
				$rowNomina=$app_nomina->consultadatos($query_nomina,$select);
				foreach($rowNomina as $a => $value){
					$DatosNomina['Nomina'][] = array(
                    'id'=>$value['id'],
                    'Codigo'=>$value['Codigo'],
                    'Empresa'=>$value['Empresa'],
                    'FechaInicial'=>$value['FechaInicial'],
                    'FechaFinal'=>$value['FechaFinal'],
                    'Comprobante'=>$value['Comprobante'],
                    'Total'=>$value['Total'],
                    'Estado'=>$value['Estado']
					);
				}

				$tbl_conceptos='electry_nomina_conceptos';
				$app_conceptos=new Electry($tbl_conceptos);
				$query_conceptos="";
				$rowConceptos=$app_conceptos->consultadatos($query_conceptos,$select);				
				foreach($rowConceptos as $a => $value){
					$DatosConceptos['Conceptos'][] = array(
                    'id'=>$value['id'],
                    'Concepto'=>$value['Concepto'],
                    'Porcentaje'=>$value['Porcentaje'],
                    'Tipo'=>$value['Tipo'],
                    'value'=>$value['id'],
                    'label'=>$value['Concepto']
					);
				}					
				
				$tbl_nomina='electry_nomina';
				$app_nomina=new Electry($tbl_nomina);
					$rowNomina=$app_nomina->consultadatos('',$select);
				foreach($rowNomina as $a => $value){
					$TodasNomina['TodasNomina'][] = array(
                    'id'=>$value['id'],
                    'Codigo'=>$value['Codigo'],
                    'Empresa'=>$value['Empresa'],
                    'FechaInicial'=>$value['FechaInicial'],
                    'FechaFinal'=>$value['FechaFinal'],
                    'Total'=>$value['Total'],
                    'Estado'=>$value['Estado'],
					);
				}
					$EstadosNomina['EstadosNomina'][]=$EstadosNomina;	
					$data = array("data"=>array_merge($DatosEmpleado,$DatosNomina,$EmpleadoNomina,$DatosConceptos,$TodasNomina,$EstadosNomina));
					$var = var2js($data);
					echo $var;		

			break;
			case 'consultar_conceptos':
			$tbl_conc='electry_nomina_conceptos';
			$app_conc=new Electry($tbl_conc);			
				$query='';
				$select='*';
				$row=$app_conc->consultadatos($query,$select);
				
				if (!is_null($row)) {
					$var = var2js($row);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'Codigo'=>'',
                    'Concepto'=>'No existen registros',
                    'Tipo'=>'0',
                    'Porcentaje'=>'0',
                    'status'=>'Deactivated');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'consultar_estados':
			$tbl_conc='electry_nomina_estados';
			$app_conc=new Electry($tbl_conc);			
				$query='';
				$select='*';
				$est=$app_conc->consultadatos($query,$select);
				foreach($est as $a => $adm){
					$out[] = array(
                    'id'=>$adm['id'],
                    'value'=>$adm['Estado'],
                    'label'=>$adm['Estado'],
                    'Descripcion'=>$adm['Descripcion']);
				}
				
				if (!is_null($out)) {
					$var = var2js($out);
					echo $var;
				}else{
				$est[] = array(
                    'id'=>1,
                    'value'=>'',
                    'label'=>'No existen registros',
                    'Tipo'=>'0',
                    'Porcentaje'=>'0',
                    'status'=>'Deactivated');
					$var = var2js($est);	
					echo $var;	                            
				}
					
			break;			
			case 'listar_nominas':
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);
				$tbl_es='electry_nomina_estados';
				$app_e=new Electry($tbl_es);

				$row=$app->consultadatos($query,$select);
				$estados=$app_e->consultadatos($query,$select);
	 
				
				
				$data = array("data"=>array_merge(array('Nomina'=>$row),array('Estados'=>$estados)));
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'Codigo'=>'',
                    'Empresa'=>'No existen registros',
                    'FechaInicial'=>'0',
                    'FechaFinal'=>'0',
                    'Comprobante'=>'0',
                    'Total'=>'0',
                    'Estado'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'Deactivated');
					$data = array("data"=>array_merge($row));
					$var = var2js($data);	
					echo $var;	                            
				}
					
			break;
			case 'add':
					$select='*';
					$cod=$app->codigo('id');
					$chartic=array();
					//CARGO EL ARRAY 
					$chartic['Codigo']='NG2-0'.$cod;
					$chartic['Empresa']=$_POST['Empresa'];
					$chartic['FechaInicial']=$_POST['FechaInicial'];
					$chartic['FechaFinal']=$_POST['FechaFinal'];
					$chartic['Comprobante']=$cod;
					$chartic['Total']=$_POST['Total'];
					$chartic['Estado']=$_POST['Estado'];
					$chartic['status']='Active';
					//GUARDO
					
					$id=$app->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'El proceso fue registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'addNomina':
					$select='*';
					$tbl_nomin='electry_nomina_empleados';
					$app_nomin=new Electry($tbl_nomin);
					$Total=$_POST['Cantidad']*$_POST['Valor'];
					$IdEmpleado=$_POST['IdEmpleado'];
					$IdNomina=$_POST['IdNomina'];
					$IdConcepto=$_POST['Concepto'];
					
					
				$tbl_conceptos='electry_nomina_conceptos';
				$app_conceptos=new Electry($tbl_conceptos);
				$rowConceptos=$app_conceptos->consultadatos("Concepto='".$IdConcepto."'",$select);				
				foreach($rowConceptos as $a => $value){
  					if($value['Tipo']=='Devengado'){
					$Devengado=$_POST['Valor'];	
					$Deducido=0;	
				}else{
					$Devengado=0;	
					$Deducido=$_POST['Valor'];						
				}				
				
				}					
				
					$chartic=array();
					//CARGO EL ARRAY 
					
					$chartic['Nomina']=$IdNomina;
					$chartic['Empleado']=$IdEmpleado;
					$chartic['Concepto']=$_POST['Concepto'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['Devengado']=$Devengado;
					$chartic['Deducido']=$Deducido;
					$chartic['Total']=$Total;
					//GUARDO
					
					$id=$app_nomin->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'El proceso fue registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':
					
					$chartic=array();
					$chartic['FechaInicial']=$_POST['FechaInicial'];
					$chartic['FechaFinal']=$_POST['FechaFinal'];
					$chartic['Estado']=$_POST['Estado'];
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. La Nómina: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_nomina","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
