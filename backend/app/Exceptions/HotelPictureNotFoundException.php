<?php

namespace App\Exceptions;

use Exception;

class HotelPictureNotFoundException extends Exception
{
    protected $message = 'Photo d\'hôtel non trouvée.';
    protected $code = 404;

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
