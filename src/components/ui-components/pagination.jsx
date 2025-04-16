                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn("h-9 w-9", currentPage === page && "bg-primary hover:bg-primary/90")}
                asChild={currentPage !== page}
              >
                {currentPage === page ? <span>{page}</span> : <Link href={`${baseUrl}?page=${page}`}>{page}</Link>}
              </Button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            disabled={currentPage === totalPages}
            asChild={currentPage !== totalPages}
          >
            {currentPage === totalPages ? (
              <span>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </span>
            ) : (
              <Link href={`${baseUrl}?page=${currentPage + 1}`}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Link>
            )}
          </Button>
        </li>
      </ul>
    </nav>
  )
}
