
<HTML>
<HEAD>
<META http-equiv=Content-Type content="text/html; charset=windows-1251">
<title>Дурак подкидной</title>

<!--
window.status="Дурак подкидной";
//-->
</HEAD>
<BODY bgcolor="#0B2A40" leftmargin="0" marginwidth="0" marginheight="0" topmargin="0">
<script type="text/javascript" src="scripts/swfobject.js"></script>
<script type="text/javascript">
function show_flash()
{
  var flashvars = {
  'login': '<?echo $l?>',
  'password': '<?echo $pass;?>',
  'host' : 'golden-fishka.com',
  'port' : '9875',
  'exitURL' : '../index.php'
  };
  var params = {
    'allowScriptAccess': 'always',
    'bgcolor': '#0B2A40',
    'quality': 'high',
    'menu' : 'true'
  };
  swfobject.embedSWF("foolpodk.swf", "swf_window", "100%", "100%", "9.0","expressinstall.swf", flashvars, params);
}
</script>
<script>
show_flash();
</script>
<center>
<div id="swf_window">

</div>
</center>
<script>
show_flash();
</script>
<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>


</BODY></HTML>
