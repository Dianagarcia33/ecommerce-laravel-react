<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    /**
     * Obtener todas las plantillas de email
     */
    public function index()
    {
        $templates = EmailTemplate::orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'templates' => $templates
        ]);
    }

    /**
     * Obtener una plantilla específica
     */
    public function show($id)
    {
        $template = EmailTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Plantilla no encontrada'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'template' => $template
        ]);
    }

    /**
     * Crear una nueva plantilla
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:email_templates,name',
            'subject' => 'required|string|max:500',
            'content' => 'required|string',
            'variables' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $template = EmailTemplate::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Plantilla creada exitosamente',
            'template' => $template
        ], 201);
    }

    /**
     * Actualizar una plantilla existente
     */
    public function update(Request $request, $id)
    {
        $template = EmailTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Plantilla no encontrada'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:email_templates,name,' . $id,
            'subject' => 'sometimes|required|string|max:500',
            'content' => 'sometimes|required|string',
            'variables' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $template->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Plantilla actualizada exitosamente',
            'template' => $template
        ]);
    }

    /**
     * Eliminar una plantilla
     */
    public function destroy($id)
    {
        $template = EmailTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Plantilla no encontrada'
            ], 404);
        }

        $template->delete();

        return response()->json([
            'success' => true,
            'message' => 'Plantilla eliminada exitosamente'
        ]);
    }

    /**
     * Vista previa de una plantilla con datos de ejemplo
     */
    public function preview(Request $request, $id)
    {
        $template = EmailTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Plantilla no encontrada'
            ], 404);
        }

        $sampleData = $request->input('data', []);
        $renderedContent = $template->renderContent($sampleData);

        return response()->json([
            'success' => true,
            'template' => $template,
            'rendered_content' => $renderedContent,
            'available_variables' => $template->variables
        ]);
    }

    /**
     * Activar/Desactivar una plantilla
     */
    public function toggleStatus($id)
    {
        $template = EmailTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Plantilla no encontrada'
            ], 404);
        }

        $template->is_active = !$template->is_active;
        $template->save();

        return response()->json([
            'success' => true,
            'message' => 'Estado actualizado exitosamente',
            'template' => $template
        ]);
    }
}
