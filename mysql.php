<? 

require_once('database.php');

class Mysql extends Database { 

    static private $instance; 
    private $last_id;

    protected function __construct($dbHost=null, $dbName=null, $dbUser=null, $dbPass=null) { 
        parent::__construct($dbHost, $dbName, $dbUser, $dbPass); 
    } 

    static function getInstance($dbHost, $dbName, $dbUser, $dbPass) { 
        if(!Mysql::$instance) { 
            Mysql::$instance = new Mysql($dbHost, $dbName, $dbUser, $dbPass); 
        } 
        return Mysql::$instance; 
    } 

    public function __set($name, $value) { 
        if (isset($name) && isset($value)) { 
            parent::__set($name, $value); 
        } 
    } 

    public function __get($name) { 
        if (isset($name)) { 
            return parent::__get($name); 
        } 
    } 

    public function connected() { 
        if (is_resource($this->connection)) { 
            return true; 
        } else { 
            return false; 
        } 
    } 

    public function affectedRows() { 
        return mysql_affected_rows($this->connection); 
    } 

    public function open() { 
        if (is_null($this->database)) 
            die("MySQL database not selected"); 
        if (is_null($this->hostname)) 
            die("MySQL hostname not set"); 

        $this->connection = @mysql_connect($this->hostname, $this->username, $this->password); 

        if ($this->connection === false) 
        die("Could not connect to database. Check your username and password then try again.\n"); 

        if (!mysql_select_db($this->database, $this->connection)) { 
            die("Could not select database"); 
        } 
    } 

    public function close() { 
        mysql_close($this->connection); 
        $this->connection = null; 
    } 

    public function query($sql) { 
        if ($this->connection === false) { 
            die('No Database Connection Found.'); 
        } 

        $result = @mysql_query($sql,$this->connection); 
        if ($result === false) { 
            die(mysql_error()); 
        } 
        return $result; 
    } 
    
    public function insert($table, $data)
    {
        global $lang, $admin_lang; if ($admin_lang) $lang = $admin_lang; 
        $args = array();
        foreach($data as $key => $value)
        {
            $args[$key] = mysql_real_escape_string($value);
        }
        
        $keys = array_keys($data);
        $values = array_values($args);
        
        $query = "insert INTO {$table} (" . implode(", ", $keys) . ") VALUES ('" . implode("', '", $values) . "')";
        $res = mysql_query($query);

        $this->last_id = mysql_insert_id();
    }

    public function update($table, $data, $where)
    {
        global $lang, $admin_lang; if ($admin_lang) $lang = $admin_lang;
        $args = array();
        foreach($data as $key => $value)
        {
            $args[] = $key ." = '" .mysql_real_escape_string($value) . "'";
        }   
        
        $keys = array_keys($where);

        $where_sql = "WHERE {$keys[0]} = {$where[$keys[0]]}";
        for($i = 1; $i < count($where); $i++)
        {
            $where_sql .= " AND {$keys[$i]} = {$where[$keys[$i]]}";
        }
        $query = "UPDATE {$table} SET " . implode(',',$args) . " {$where_sql} ";
        $this->query($query);
    }

    public function delete($table, $id, $where)
    {
        global $lang, $admin_lang; if ($admin_lang) $lang = $admin_lang;
        
        $keys = array_keys($where);    
        $where_sql = "WHERE {$key[0]} = {$where[$key[0]]}";
        for($i = 1; $i < count($where); $i++)
        {
            $where_sql .= " AND {$key[$i]} = {$where[$key[$i]]}";
        }
        
        $query = "DELETE FROM {$table}  WHERE {$key[0]} = {$where_sql} ";
        $this->query($query);
    }

    public function fetchArray($result) { 
        if ($this->connection === false) { 
            die('No Database Connection Found.'); 
        } 
         
        $data = @mysql_fetch_array($result); 
        if (!is_array($data)) { 
            die(mysql_error()); 
        } 
        return $data; 
    } 
    
    public function getLastId()
    {
        return $this->last_id;
    }
} 
?> 
