#!/bin/bash

# Configuration
ROOT_DIR="/home/z/my-project/mini-services"

main() {
    echo "🚀 Starting batch dependency install..."
    
    # Check if ROOT_DIR exists
    if [ ! -d "$ROOT_DIR" ]; then
        echo "ℹ️  Directory $ROOT_DIR not found, skipping install"
        return
    fi
    
    # Counter variables
    success_count=0
    fail_count=0
    failed_projects=""
    
    # Iterate through all folders in mini-services directory
    for dir in "$ROOT_DIR"/*; do
        # Check if it's a directory and contains package.json
        if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
            project_name=$(basename "$dir")
            echo ""
            echo "📦 Installing dependencies: $project_name..."
            
            # Enter project directory and run bun install
            if (cd "$dir" && bun install); then
                echo "✅ $project_name dependencies installed"
                success_count=$((success_count + 1))
            else
                echo "❌ $project_name dependency install failed"
                fail_count=$((fail_count + 1))
                if [ -z "$failed_projects" ]; then
                    failed_projects="$project_name"
                else
                    failed_projects="$failed_projects $project_name"
                fi
            fi
        fi
    done
    
    # Summary
    echo ""
    echo "=================================================="
    if [ $success_count -gt 0 ] || [ $fail_count -gt 0 ]; then
        echo "🎉 Install complete!"
        echo "✅ Success: $success_count"
        if [ $fail_count -gt 0 ]; then
            echo "❌ Failed: $fail_count"
            echo ""
            echo "Failed projects:"
            for project in $failed_projects; do
                echo "  - $project"
            done
        fi
    else
        echo "ℹ️  No projects with package.json found"
    fi
    echo "=================================================="
}

main
