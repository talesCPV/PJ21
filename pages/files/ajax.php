<?php

    include "database.php";
    
    if (IsSet($_POST ["source"])){
        $source = $_POST ["source"];
        
        switch ($source) {
            case "login":
                $user = crip($_POST ["param_0"]);
                $pass = crip($_POST ["param_1"]);
                $query = "SELECT * FROM tb_user WHERE user='{$user}' AND pass='{$pass}';";
                $result = mysqli_query($conexao, $query);
                $qtd_lin = $result->num_rows;
                if($qtd_lin >0){
                    $fetch = mysqli_fetch_row($result);
                    $id = $fetch[0];
                    $user = decrip($fetch[1]);
                    $class = decrip($fetch[3]);                    
                    $class = substr($class, strlen($user),strlen($class));
                    $arr = [200,$user,$class];                    

                    setcookie("log", "true", 8 * time()+3600);
                    setcookie("user_id", $id, 8 * time()+3600);
                    setcookie("user", $user, 8 * time()+3600);
                    setcookie("class", $class, 8 * time()+3600);
                }else{
                    $arr = [500,"usuario ou senha incorreta"];
                }
                print json_encode($arr);
                $found = false;                
                break;
            default:
                $found = false;
        }


        if($found){
            $result = mysqli_query($conexao, $query);
            $qtd_lin = $result->num_rows;
            $arr = [];
            while($fetch = mysqli_fetch_row($result)){
                $arr[] = $fetch;            
            }
            print json_encode($arr);
        }


    }
    $conexao->close();

?>