<?php

namespace App\Exceptions;

use Exception;

class FileUploadException extends Exception
{
    protected $message = 'Erreur lors de l\'upload du fichier.';
    protected $code = 422;

    public function __construct($message = null, $code = null, Exception $previous = null)
    {
        $message = $message ?? $this->message;
        $code = $code ?? $this->code;
        
        parent::__construct($message, $code, $previous);
    }

    public function render($request)
    {
        return response()->json([
            'success' => false,
            'message' => $this->getMessage(),
            'status_code' => $this->getCode(),
        ], $this->getCode());
    }
}
