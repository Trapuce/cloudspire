<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e): JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
    {
        if ($request->is('api/*')) {
            return $this->handleApiException($request, $e);
        }

        return parent::render($request, $e);
    }

    /**
     * Handle API exceptions with structured JSON responses.
     */
    private function handleApiException(Request $request, Throwable $e): JsonResponse
    {
        $statusCode = 500;
        $message = 'Une erreur interne du serveur s\'est produite.';
        $errors = null;

        switch (true) {
            case $e instanceof ValidationException:
                $statusCode = 422;
                $message = 'Les données fournies ne sont pas valides.';
                $errors = $e->errors();
                break;

            case $e instanceof ModelNotFoundException:
                $statusCode = 404;
                $message = 'La ressource demandée n\'a pas été trouvée.';
                break;

            case $e instanceof NotFoundHttpException:
                $statusCode = 404;
                $message = 'L\'endpoint demandé n\'existe pas.';
                break;

            case $e instanceof MethodNotAllowedHttpException:
                $statusCode = 405;
                $message = 'Méthode HTTP non autorisée pour cet endpoint.';
                break;

            case $e instanceof UnauthorizedHttpException:
                $statusCode = 401;
                $message = 'Non autorisé à accéder à cette ressource.';
                break;

            case $e instanceof QueryException:
                $statusCode = 500;
                $message = 'Erreur de base de données.';
                
                if (config('app.debug')) {
                    $message = 'Erreur de base de données: ' . $e->getMessage();
                }
                break;

            default:
                $statusCode = 500;
                $message = 'Une erreur inattendue s\'est produite.';
                
                if (config('app.debug')) {
                    $message = $e->getMessage();
                }
                break;
        }

        $response = [
            'success' => false,
            'message' => $message,
            'status_code' => $statusCode,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        if (config('app.debug')) {
            $response['debug'] = [
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ];
        }

        return response()->json($response, $statusCode);
    }
}
